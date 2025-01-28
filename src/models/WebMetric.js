import mongoose from 'mongoose';

const webMetricSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Web',
    required: true
  },
  category: {
    type: String,
    enum: ['Fritz International', 'Club300'],
    required: true
  },
  metric: {
    type: String,
    enum: [
      'Total Visitas',
      'Home Venezuela',
      'Home Chile',
      'Home Peru',
      'Home Usa',
      'Contacto Venezuela',
      'Contacto Chile',
      'Contacto Peru',
      'Contacto Usa',
      'Pagina Sorpresas',
      'Clic en Jugar',
      'Home Club300',
      'Pagina Registro',
      'Pagina Galeria',
      'Otras Paginas'
    ],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const WebMetric = mongoose.model('WebMetric', webMetricSchema);