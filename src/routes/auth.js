// src/routes/auth.js
import express from 'express';
import { login, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/login', login);

// Rutas protegidas
router.get('/me', protect, getCurrentUser);

export default router;