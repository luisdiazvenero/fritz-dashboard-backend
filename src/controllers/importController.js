import { getMetricModel } from './metricsController.js';

export const importData = async (req, res) => {
  console.log('Datos recibidos:', req.body);

  try {
    // Agrupa los datos por `type`
    const groupedData = req.body.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    const results = [];
    const errors = [];

    for (const [type, data] of Object.entries(groupedData)) {
      try {
        // Obtiene el modelo adecuado para el tipo
        const MetricModel = getMetricModel(type);

        // Validar datos
        const validData = data.filter((item, index) => {
          const { category, metric, value, date } = item;
          if (!category || !metric || typeof value !== 'number' || !date) {
            errors.push(`Fila ${index + 1}: Campos faltantes o inválidos para el tipo ${type}`);
            return false;
          }
          return true;
        });

        if (validData.length > 0) {
          // Inserta datos válidos
          const insertedData = await MetricModel.insertMany(validData);
          results.push({
            type,
            count: insertedData.length,
            data: insertedData,
          });
        }
      } catch (error) {
        console.error(`Error procesando el tipo ${type}:`, error);
        errors.push(`Error procesando el tipo ${type}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Errores en los datos',
        details: errors,
      });
    }

    res.status(201).json({
      message: 'Datos importados exitosamente',
      results,
    });
  } catch (error) {
    console.error('Error al importar datos:', error);
    res.status(500).json({ error: 'Error al procesar los datos' });
  }
};
