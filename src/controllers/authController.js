// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password were sent
    if (!email || !password) {
      return res.status(400).json({
        error: 'Por favor proporcione email y contraseña'
      });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Check status
    if (user.status !== 'active') {
      return res.status(401).json({
        error: 'Usuario inactivo'
      });
    }

    // Verify password
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Send response
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
};

// Create initial admin user if none exists
export const createInitialAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@fritzinternational.com',
        password: 'Admin2024!',
        role: 'admin'
      });
      console.log('Usuario admin creado exitosamente');
    }
  } catch (error) {
    console.error('Error creando usuario admin:', error);
  }
};