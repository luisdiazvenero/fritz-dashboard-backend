import express from 'express';
import { importData } from '../controllers/importController.js';

const router = express.Router();

// Middleware para logging específico de la ruta de importación
router.use((req, res, next) => {
  console.log('Import Route:', req.method, req.url);
  console.log('Request Body:', JSON.stringify(req.body, null, 2)); // Ver JSON más legible
  try {
    next(); // Continúa al siguiente middleware si no hay errores
  } catch (error) {
    console.error('Error en middleware de importación:', error.message);
    res.status(500).json({ error: 'Error interno del servidor en importación' });
  }
});


router.post('/data', importData);

// Ruta de prueba para verificar que el router está funcionando
router.get('/test', (req, res) => {
  res.json({ message: 'Import route working!' });
});

export default router;