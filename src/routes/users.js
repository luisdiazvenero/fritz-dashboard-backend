// src/routes/users.js
import express from 'express';
import { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  getUserById 
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas solo para administradores
router.post('/', authorize('admin'), createUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

// Rutas accesibles para administradores y editores
router.get('/', authorize('admin', 'editor'), getUsers);
router.get('/:id', authorize('admin', 'editor'), getUserById);

export default router;