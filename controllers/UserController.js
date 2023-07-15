// Importar las funciones necesarias
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

// Definir el controlador de usuarios
const UserController = {
  // Método para crear un nuevo usuario
  async registerUser(req, res, next) {
    const { name, lastName, email, password, role } = req.body;

    // Validación de los campos requeridos
    if (!name || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Validación del dominio de correo electrónico
    const emailDomain = email.split("@")[1];
    if (emailDomain !== "edem.es") {
      return res.status(400).json({ message: "Solo se permiten direcciones de correo electrónico de EDEM" });
    }

    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe' });
      }

      // Generar la contraseña cifrada
      const hashedPassword = await bcrypt.hashSync(password, 10);

      // Crear el usuario
      const user = await User.create({ //req.body
        name,
        lastName,
        email,
        password: hashedPassword,
        role
      });

      // Generar un token JWT para autenticación
      const token = jwt.sign({ _id: User._id }, jwt_secret, { expiresIn: '1h' });

      res.status(201).json({ message: 'Usuario registrado exitosamente', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
      next(error);
    }
  },

  // Método para iniciar sesión de un usuario
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      // Buscar el usuario por correo electrónico en la base de datos
      const user = await User.findOne({ email });

      // Verificar si el usuario existe
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada
      const isMatch = await bcrypt.compareSync(password, user.password);

      // Verificar si las contraseñas coinciden
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT para autenticación
      const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '1h' });
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);

      // Enviar una respuesta exitosa con el token de autenticación
      res.status(200).json({ message: "Wellcome " + user.name, token });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error durante el inicio de sesión' });
      next(error);
    }
  },

  // Método para obtener el usuario actual
  async getCurrentUser(req, res) {
    try {
      // Obtener la información del usuario autenticado desde el objeto `req.user` gracias al middleware de autenticación
      const user = req.user;

      // Devolver la información del usuario
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al recuperar la información del usuario' });
    }
  },

  // Método para cerrar sesión del usuario
  async logoutUser(req, res) {
    try {
      // Obtén el token de autorización del encabezado de la solicitud
      const token = req.headers.authorization;

      // Elimina el token de la base de datos (aquí asumo que estás usando una base de datos para almacenar los tokens de sesión)
      await Token.destroy({ where: { token } });

      // Envía una respuesta exitosa
      res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error durante el cierre de sesión' });
    }
  },

  // Método para otorgar puntos a un usuario (solo para profesores)
  async givePoints(req, res) {
    try {
      const { _id } = req.params;
      const { points } = req.body;

      // Verificar si el usuario existe
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Verificar si el usuario tiene el rol de profesor
      if (user.role !== 'profesor') {
        return res.status(403).json({ message: 'Solo los profesores pueden otorgar puntos' });
      }

      // Agregar los puntos al usuario
      user.punctuation += points;
      await user.save();

      res.json({ message: 'Puntos agregados exitosamente', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar puntos' });
    }
  }
};

// Exportar el controlador de usuarios
module.exports = UserController;
