// src/mocks/webMetrics.js

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Función helper para generar fechas de los últimos 6 meses
const getLastMonths = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(currentYear, currentMonth - (count - 1 - i), 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  });
};

const months = getLastMonths(6);

export const webMetricsMock = {
  // Métricas globales
  total: 41000,
  previousTotal: 34500,
  newLovers: 1250,
  previousNewLovers: 960,
  registrosClub300: 380,
  previousRegistrosClub300: 320,
  paginaSorpresas: 4500,
  previousPaginaSorpresas: 3800,
  clickJugar: 8200,
  previousClickJugar: 7100,

  // Métricas por país
  byCountry: {
    venezuela: {
      visits: 41000,
      previousVisits: 34500,
      contact: 8500,
      previousContact: 7200
    },
    peru: {
      visits: 35000,
      previousVisits: 30500,
      contact: 7200,
      previousContact: 6300
    },
    chile: {
      visits: 32000,
      previousVisits: 28500,
      contact: 6800,
      previousContact: 5900
    },
    usa: {
      visits: 28000,
      previousVisits: 25500,
      contact: 5500,
      previousContact: 4800
    }
  },

  // Métricas Club 300
  club300: {
    home: 10500,
    previousHome: 8500,
    registro: 5300,
    previousRegistro: 4200,
    galeria: 3700,
    previousGaleria: 2800,
    otras: 2800,
    previousOtras: 2200
  },

  // Timeline para gráficos - usando meses dinámicos
  timeline: [
    { month: months[0], total: 10000, venezuela: 3500, peru: 2500, chile: 2500, usa: 1500, newLovers: 280 },
    { month: months[1], total: 11500, venezuela: 4000, peru: 2800, chile: 2700, usa: 2000, newLovers: 320 },
    { month: months[2], total: 13000, venezuela: 4200, peru: 3200, chile: 3100, usa: 2500, newLovers: 360 },
    { month: months[3], total: 12000, venezuela: 4000, peru: 3000, chile: 3000, usa: 2000, newLovers: 350 },
    { month: months[4], total: 14000, venezuela: 4500, peru: 3500, chile: 3500, usa: 2500, newLovers: 420 },
    { month: months[5], total: 15000, venezuela: 5000, peru: 3800, chile: 3700, usa: 2500, newLovers: 480 }
  ],

  club300Timeline: [
    { month: months[3], total: 12000, newLovers: 350 },
    { month: months[4], total: 14000, newLovers: 420 },
    { month: months[5], total: 15000, newLovers: 480 }
  ]
};