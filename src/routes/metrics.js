// src/routes/metrics.js
import express from 'express';
import { 
    getWebMetrics, 
    getSocialMetrics, 
    getMediaMetrics, 
    getMetricsSummary,
    createMetric,
    updateMetric,
    deleteMetric,
    getMetricHistory,
    getMetrics
} from '../controllers/metricsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas de lectura
router.get('/web', getWebMetrics);
router.get('/social', getSocialMetrics);
router.get('/media', getMediaMetrics);
router.get('/summary', getMetricsSummary);
router.get('/', protect, getMetrics);

// Rutas CRUD protegidas
router.post('/:type', protect, authorize('admin', 'editor'), createMetric);
router.put('/:type/:id', protect, authorize('admin', 'editor'), updateMetric);
router.delete('/:type/:id', protect, authorize('admin'), deleteMetric);
router.get('/history/:type/:id', protect, authorize('admin', 'editor'), getMetricHistory);

export default router;