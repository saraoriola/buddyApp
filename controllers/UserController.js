const User = require("../models/User.js");
const Doubt = require("../models/Doubts.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const UserController = {
  async registerUser(req, res, next) {
    const { name, lastName, email, password, role } = req.body;

    if (!name || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    const emailDomain = email.split("@")[1];
    if (emailDomain !== "edem.es") {
      return res.status(400).json({ message: "Only EDEM email addresses are allowed" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        punctuation: 0,
        role: "student"
      });

      const token = jwt.sign({ _id: User._id }, jwt_secret, { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
      next(error);
    }
  },

  async loginUser(req, res, next) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compareSync(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '1h' });
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
  
      res.status(200).json({ message: "Welcome " + user.name, token });
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
      res.send({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem logging out the user",
      });
    }
  },
  
  async givePoints(req, res) {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.role !== 'teacher' && user.role !== 'teacherAssistant') {
        return res.status(403).json({ message: 'Only teachers can give points' });
      }
  
      user.punctuation += 1;
      await user.save();
  
      res.json({ message: 'Points added successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding points' });
    }
  },

  async searchUserByName(req, res) {
    const { name } = req.query;
  
    try {
      const users = await User.find({ name });
  
      res.json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching for users" });
    }
  },
  
  async getUserById(req, res) {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching for the user" });
    }
  },
  
  async getCurrentUserWithDoubts(req, res) {
    try {
      const user = req.user;
      const doubts = await Doubt.find({ userId: user._id });
  
      res.json({ user, doubts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user information and doubts" });
    }
  }
  
};

module.exports = UserController;