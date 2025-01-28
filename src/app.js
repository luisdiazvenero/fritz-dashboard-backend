import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { createInitialAdmin } from './controllers/authController.js';

// Importar rutas
import metricsRoutes from './routes/metrics.js';
import importRoutes from './routes/import.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';  // Añadimos esta línea

dotenv.config();

// Conectar a MongoDB y crear admin inicial
await connectDB();
await createInitialAdmin();

const app = express();

// Configuración CORS detallada
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/api/metrics', metricsRoutes);
app.use('/api/import', importRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // Añadimos esta línea

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Fritz Dashboard API working!' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});