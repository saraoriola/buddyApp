const User = require('../models/User.js');
const Doubt = require('../models/Doubt.js');
const transporter = require('../config/nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = {
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      await User.update(
        { confirmed: true },
        {
          where: {
            email: payload.email,
          },
        }
      );
      res.status(201).send('User successfully confirmed');
    } catch (error) {
      console.error(error);
    }
  },

  async registerUser(req, res, next) {
    const { name, lastName, email, password, role } = req.body;

    if (!name || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'edem.es') {
      return res
        .status(400)
        .json({ message: 'Only EDEM email addresses are allowed' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);
      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        { expiresIn: '48h' }
      );
      const url = 'http://localhost:3000/users/confirm/' + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: 'Confirm Your Registration',
        html: `<h3>Welcome, you're one step away from registering</h3>
        <a href="${url}">Click to confirm your registration</a>`,
      });

      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        punctuation: 0,
        role: 'student',
      });

      res
        .status(201)
        .json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.params.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '48h',
        }
      );
      const url = 'http://localhost:3000/users/resetPassword/' + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: 'Recover Password',
        html: `<h3>Recover Password</h3>
          <a href="${url}">Recover Password</a>
          The link will expire in 48 hours
        `,
      });
      res.send({
        message: 'A recovery email has been sent to your email address',
      });
    } catch (error) {
      console.error(error);
    }
  },

  async resetPassword(req, res) {
    try {
      const recoverToken = req.params.recoverToken;
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: req.body.password }
      );
      res.send({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
    }
  },

  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!user.confirmed) {
        return res.status(400).send({ message: 'You must confirm your email' });
      }

      const isMatch = await bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();

      res.status(200).json({ message: 'Welcome ' + user.name, token });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during login' });
      next(error);
    }
  },

  async getCurrentUser(req, res) {
    try {
      const user = req.user;
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user information' });
    }
  },

  async logoutUser(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'There was a problem logging out the user',
      });
    }
  },

  async givePoints(req, res) {
    const { _id } = req.params;

    try {
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role !== 'teacher' && user.role !== 'teacherAssistant') {
        return res
          .status(403)
          .json({ message: 'Only teachers can give points' });
      }

      user.punctuation += 1;
      await user.save();

      res.json({ message: 'Points added successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding points' });
    }
  },

  async removePoints(req, res) {
    const { _id } = req.params;

    try {
      const user = await User.findById(_id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.user.role !== 'teacherAssistant') {
        return res
          .status(403)
          .json({ message: 'Only teacher assistants can remove points' });
      }

      if (user.punctuation > 0) {
        user.punctuation -= 1;
        await user.save();
      }

      res.json({ message: 'Points removed successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing points' });
    }
  },

  async searchUserByName(req, res) {
    const { name } = req.query;

    try {
      const users = await User.find({ name });

      res.json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching for users' });
    }
  },

  async getUserById(req, res) {
    const { _id } = req.params;

    try {
      const user = await User.findById(_id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching for the user' });
    }
  },

  async getUsersWithDoubts(req, res) {
    try {
      const user = req.user;

      const doubts = await Doubt.find({ userId: user._id });

      res.json({ user, doubts });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error retrieving user information and doubts' });
    }
  },

  async getRanking(req, res) {
    try {
      const users = await User.find()
        .sort({ punctuation: -1 })
        .select('name punctuation');
      res.json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  },
};

module.exports = UserController;
