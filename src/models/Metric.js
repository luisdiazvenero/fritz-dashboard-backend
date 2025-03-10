import mongoose from 'mongoose';

// Web Metrics Schema
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
      'Otras Paginas',
      'Nuevos Fritz Lover'
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
  }
}, { timestamps: true });

// Social Metrics Schema (sin cambios por ahora)
const socialMetricSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Redes Sociales',
    required: true
  },
  category: {
    type: String,
    enum: ['YouTube', 'Instagram', 'TikTok', 'Facebook'],
    required: true
  },
  account: {
    type: String,
    required: function() {
      return this.category === 'Instagram';
    },
    validate: {
      validator: function(value) {
        return this.category !== 'Instagram' || (typeof value === 'string' && value.trim().length > 0);
      },
      message: "El campo 'account' es obligatorio para métricas de Instagram."
    }
  },
  metric: {
    type: String,
    enum: [
      'Suscriptores',
      'Nuevos Suscriptores',
      'Videos',
      'Nuevos Videos',
      'Visualizaciones',
      'Visualizaciones de Videos',
      'Visualizaciones de Perfil',
      'Seguidores',
      'Seguidores Netos',
      'Nuevos Seguidores',
      'Impresiones',
      'Alcance',
      'Interacciones',
      'Me gusta',
      'Compartidos'
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
  }
}, { timestamps: true });





// Media Investment Schema (sin cambios por ahora)
const mediaMetricSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Inversión en Medios',
    required: true
  },
  category: {
    type: String,
    enum: [
      'Gastos por Plataforma',
      'Métricas de Performance',
      'Métricas META',
      'Métricas de Interacción',
      'Conversiones'
    ],
    required: true
  },
  metric: {
    type: String,
    enum: [
      'Gasto en Google Ads',
      'Gasto en META Ads',
      'CTR',
      'CPC',
      'Alcance en META',
      'Seguimiento en Facebook',
      'Seguidores en Instagram',
      'Interacciones',
      'Comentarios',
      'Compartidos',
      'Reproducciones',
      'Clicks',
      'Registros Club 300'
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
  }
}, { timestamps: true });


export const WebMetric = mongoose.model('WebMetric', webMetricSchema);
export const SocialMetric = mongoose.model('SocialMetric', socialMetricSchema);
export const MediaMetric = mongoose.model('MediaMetric', mediaMetricSchema);
