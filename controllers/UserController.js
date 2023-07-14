// Import necessary functions
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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

    // Method to login a user
    async loginUser (req, res){
        const { email, password } = req.body;
      
        try {
          // Buscar el usuario por correo electrónico en la base de datos
          const user = await User.findOne({ email });
      
          // Verificar si el usuario existe
          if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          // Comparar la contraseña proporcionada con la contraseña almacenada
          const isMatch = await bcrypt.compare(password, user.password);
      
          // Verificar si las contraseñas coinciden
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          // Generar un token JWT para autenticación
          const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
      
          // Enviar una respuesta exitosa con el token de autenticación
          res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error during login' });
        }
    },

    async getCurrentUser(req, res) {
      try {
        // Obtener la información del usuario autenticado desde el objeto `req.user` gracias al middleware de autenticación
        const user = req.user;
    
        // Devolver la información del usuario
        res.json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user information' });
      }
    },

    async logoutUser(req, res) {
      try {
        // Obtén el token de autorización del encabezado de la solicitud
        const token = req.headers.authorization;
    
        // Elimina el token de la base de datos
        await Token.destroy({ where: { token } });
    
        // Envía una respuesta exitosa
        res.status(200).json({ message: 'Logout successful' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during logout' });
      }
    }
    
  };
  
// Export the user controller
module.exports = UserController;
