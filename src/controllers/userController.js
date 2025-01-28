import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({
      error: 'Error al obtener usuarios'
    });
  }
};

// Crear nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    const user = await User.create({
      username,
      email,
      password,
      role
    });

    const userResponse = await User.findById(user._id).select('-password');
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({
      error: 'Error al crear usuario'
    });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, status, password } = req.body;

    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({
        error: 'El email ya está en uso por otro usuario'
      });
    }

    // Crear objeto de actualización
    let updateData = { username, email, role, status };

    if (password) {
      console.log('Contraseña antes de enviar al middleware:', password);
      updateData.password = password; // Solo asignar la contraseña sin hashear
    }

    const originalUser = await User.findById(id);
    console.log('Contraseña en la base de datos antes de la actualización:', originalUser.password);

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    const updatedUser = await User.findById(id);
    console.log('Contraseña en la base de datos después de la actualización:', updatedUser.password);

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({
      error: 'Error al actualizar usuario'
    });
  }
};


// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const adminCount = await User.countDocuments({ role: 'admin' });
    const userToDelete = await User.findById(id);

    if (userToDelete.role === 'admin' && adminCount <= 1) {
      return res.status(400).json({
        error: 'No se puede eliminar el último usuario administrador'
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({
      error: 'Error al eliminar usuario'
    });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({
      error: 'Error al obtener usuario'
    });
  }
};
