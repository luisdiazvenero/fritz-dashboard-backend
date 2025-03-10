import { WebMetric, SocialMetric, MediaMetric } from '../models/Metric.js';
import { MetricHistory } from '../models/MetricHistory.js';
import { webMetricsMock } from '../mocks/webMetrics.js';
import { socialMetricsMock } from '../mocks/socialMetrics.js'; 
import { mediaMetricsMock } from '../mocks/mediaMetrics.js';

export const bulkInsertMetrics = async (req, res) => {
  try {
    const metrics = req.body;
    const errors = [];
    const validMetrics = [];

    metrics.forEach((metric, index) => {
      let Model;

      // Determinar el modelo según el tipo
      if (metric.type === 'Web') {
        Model = WebMetric;
      } else if (metric.type === 'Redes Sociales') {
        Model = SocialMetric;
      } else if (metric.type === 'Inversión en Medios') {
        Model = MediaMetric;
      } else {
        errors.push({
          index,
          type: metric.type,
          error: 'Tipo de métrica no válido',
          details: metric,
        });
        return;
      }

       // Validar que 'account' sea obligatorio solo en Instagram
if (metric.category === 'Instagram' && !metric.account) {
  errors.push({
    index,
    type: metric.type,
    category: metric.category,
    error: "El campo 'account' es obligatorio para métricas de Instagram.",
    details: metric,
  });
  return;
}

// Crear instancia del modelo con o sin `account`
const metricData = {
  type: metric.type,
  category: metric.category,
  metric: metric.metric,
  value: metric.value,
  date: metric.date,
  ...(metric.category === 'Instagram' && metric.account ? { account: metric.account } : {}) // Solo incluir `account` si está definido
};


      const instance = new Model(metricData);

      // Validar y guardar errores
      const validationError = instance.validateSync();
      if (validationError) {
        errors.push({
          index,
          type: metric.type,
          error: validationError.message,
          details: metric,
        });
      } else {
        validMetrics.push(instance);
      }
    });

    // Si hay errores, retornarlos
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Errores en la validación',
        errors, // Aquí se devuelven los errores detallados
      });
    }

    // Guardar las métricas válidas
    await Promise.all(validMetrics.map((metric) => metric.save()));
    res.status(201).json({
      message: 'Métricas insertadas correctamente',
      count: validMetrics.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
};



// Helper function para obtener el modelo correcto
const getMetricModel = (type) => {
  switch (type) {
    case 'Web':
      return WebMetric;
    case 'Redes Sociales':
      return SocialMetric;
    case 'Inversión en Medios':
      return MediaMetric;
    default:
      throw new Error(`Tipo de métrica no válido: ${type}`);
  }
};


// Obtener métricas web
export const getWebMetrics = async (req, res) => {
  try {
    const { startDate, endDate, site } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (site) {
      query.site = site;
    }

    // Consultar siempre la base de datos
    const metricsFromDB = await WebMetric.find(query).sort({ date: -1 });

    if (!metricsFromDB.length) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron métricas en la base de datos.',
      });
    }

    return res.json({
      success: true,
      data: metricsFromDB,
    });
  } catch (error) {
    console.error('Error fetching web metrics:', error);
    res.status(500).json({ error: 'Error al obtener las métricas web' });
  }
};




// Obtener métricas sociales
export const getSocialMetrics = async (req, res) => {
  try {
    const { startDate, endDate, category, account } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (category) {
      query.category = category;
    }

    if (account) {
      query.account = account;
    }

    // Consultar siempre la base de datos
    const metricsFromDB = await SocialMetric.find(query).sort({ date: -1 });

    if (!metricsFromDB.length) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron métricas sociales en la base de datos.',
      });
    }

    return res.json({
      success: true,
      data: metricsFromDB,
    });
  } catch (error) {
    console.error('Error al obtener las métricas sociales:', error);
    res.status(500).json({ error: 'Error al obtener las métricas sociales' });
  }
};



// Obtener métricas de medios
export const getMediaMetrics = async (req, res) => {
  try {
    const { startDate, endDate, platform } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (platform) {
      query.platform = platform;
    }

    // Consultar siempre la base de datos
    const metricsFromDB = await MediaMetric.find(query).sort({ date: -1 });

    if (!metricsFromDB.length) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron métricas de medios en la base de datos.',
      });
    }

    return res.json({
      success: true,
      data: metricsFromDB,
    });
  } catch (error) {
    console.error('Error al obtener las métricas de medios:', error);
    res.status(500).json({ error: 'Error al obtener las métricas de medios' });
  }
};


// Obtener resumen de métricas
export const getMetricsSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let dateQuery = {};

    if (startDate && endDate) {
      dateQuery = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }

    // Obtener totales
    const webMetrics = await WebMetric.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: '$visits' },
          totalNewLovers: { $sum: '$newLovers' }
        }
      }
    ]);

    const socialMetrics = await SocialMetric.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: '$platform',
          totalFollowers: { $sum: '$followers' },
          totalViews: { $sum: '$views' },
          totalInteractions: { $sum: '$interactions' }
        }
      }
    ]);

    const mediaMetrics = await MediaMetric.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: '$platform',
          totalSpend: { $sum: '$spend' },
          totalReach: { $sum: '$reach' },
          avgCTR: { $avg: '$ctr' },
          avgCPC: { $avg: '$cpc' }
        }
      }
    ]);

    // Si no hay datos, devolver mock summary
    if (!webMetrics.length && !socialMetrics.length && !mediaMetrics.length) {
      const mockSummary = {
        web: { totalVisits: 41000, totalNewLovers: 1250 },
        social: [
          { _id: 'youtube', totalFollowers: 25600, totalViews: 182000, totalInteractions: 15000 },
          { _id: 'instagram', totalFollowers: 38500, totalViews: 180000, totalInteractions: 22000 },
          { _id: 'facebook', totalFollowers: 28000, totalViews: 150000, totalInteractions: 18000 }
        ],
        media: [
          { _id: 'google', totalSpend: 6000, totalReach: 320000, avgCTR: 3.4, avgCPC: 0.40 },
          { _id: 'meta', totalSpend: 5500, totalReach: 280000, avgCTR: 3.1, avgCPC: 0.42 }
        ]
      };
      return res.json(mockSummary);
    }

    res.json({
      web: webMetrics[0] || { totalVisits: 0, totalNewLovers: 0 },
      social: socialMetrics,
      media: mediaMetrics
    });
  } catch (error) {
    console.error('Error fetching metrics summary:', error);
    res.status(500).json({ error: error.message });
  }
};

// Crear nueva métrica
export const createMetric = async (req, res) => {
  try {
      const { type } = req.params;
      const MetricModel = getMetricModel(type);

      const { category, metric, value, date } = req.body;

      // Validar datos
      if (!category || !metric || typeof value !== 'number' || !date) {
          return res.status(400).json({
              success: false,
              error: 'Campos requeridos: category, metric, value, date'
          });
      }

      // Validar enumeraciones
      const allowedCategories = MetricModel.schema.path('category').enumValues;
      const allowedMetrics = MetricModel.schema.path('metric').enumValues;

      if (!allowedCategories.includes(category)) {
          return res.status(400).json({
              success: false,
              error: `Categoría no válida: ${category}`
          });
      }

      if (!allowedMetrics.includes(metric)) {
          return res.status(400).json({
              success: false,
              error: `Métrica no válida: ${metric}`
          });
      }

      const newMetric = await MetricModel.create(req.body);

      await MetricHistory.create({
        metricId: newMetric._id, // Referencia al ID del documento recién creado
        metricType: type, // Tipo de métrica (web, social, media)
        changeType: 'create', // Tipo de cambio registrado
        newValue: newMetric, // Documento completo que se acaba de crear
        changedBy: req.user._id // Usuario que hizo el cambio
      });

      res.status(201).json({
        success: true,
        data: newMetric
    });
  } catch (error) {
      console.error('Error creando métrica:', error);
      res.status(400).json({
          success: false,
          error: error.message
      });
  }
};

// Actualizar métrica
export const updateMetric = async (req, res) => {
  try {
      const { type, id } = req.params;
      const MetricModel = getMetricModel(type);

      const oldMetric = await MetricModel.findById(id);
      if (!oldMetric) {
          return res.status(404).json({
              success: false,
              error: 'Métrica no encontrada'
          });
      }

      const updatedMetric = await MetricModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
      );

      await MetricHistory.create({
          metricId: id,
          metricType: type,
          changeType: 'update',
          oldValue: oldMetric,
          newValue: updatedMetric,
          changedBy: req.user._id
      });

      res.json({
          success: true,
          data: updatedMetric
      });
  } catch (error) {
      console.error('Error actualizando métrica:', error);
      res.status(400).json({
          success: false,
          error: error.message
      });
  }
};

// Eliminar métrica
export const deleteMetric = async (req, res) => {
  try {
      const { type, id } = req.params;
      const MetricModel = getMetricModel(type);

      const metric = await MetricModel.findById(id);
      if (!metric) {
          return res.status(404).json({
              success: false,
              error: 'Métrica no encontrada'
          });
      }

      await metric.deleteOne();

      await MetricHistory.create({
          metricId: id,
          metricType: type,
          changeType: 'delete',
          oldValue: metric,
          changedBy: req.user._id
      });

      res.json({
          success: true,
          message: 'Métrica eliminada exitosamente'
      });
  } catch (error) {
      console.error('Error eliminando métrica:', error);
      res.status(400).json({
          success: false,
          error: error.message
      });
  }
};

// Obtener historial de métricas
export const getMetricHistory = async (req, res) => {
  try {
      const { type, id } = req.params;

      const history = await MetricHistory.find({
          metricId: id,
          metricType: type
      })
      .populate('changedBy', 'username email')
      .sort('-createdAt');

      res.json({
          success: true,
          count: history.length,
          data: history
      });
  } catch (error) {
      console.error('Error obteniendo historial:', error);
      res.status(400).json({
          success: false,
          error: error.message
      });
  }
};

export const getMetrics = async (req, res) => {
  try {
    const { type, category, metric, startDate, endDate } = req.query;

    // Construir un filtro dinámico basado en los parámetros
    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (metric) filter.metric = metric;
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Buscar las métricas en la base de datos
    const metrics = await WebMetric.find(filter); // Cambiar a modelo dinámico si necesitas manejar otros tipos
    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error al obtener las métricas:', error);
    res.status(500).json({ error: 'Error al obtener las métricas' });
  }
};


export { getMetricModel };