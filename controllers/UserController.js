// Import necessary functions
const { hashSync } = require("bcrypt");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Define the user controller
const UserController = {
    // Method to create a new user
    async registerUser(req, res) {
      const { name, lastName, email, password, role, punctuation } = req.body;
  
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
  
        // Generate the hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the user
        const user = await User.create({
          name,
          lastName,
          email,
          password: hashedPassword,
          role,
          punctuation
        });
  
        res.status(201).json({ message: 'User registered successfully', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering the user' });
      }
    },
  };
  
// Export the user controller
module.exports = UserController;
