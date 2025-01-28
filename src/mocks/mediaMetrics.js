// src/mocks/mediaMetrics.js
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const getLastMonths = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(currentYear, currentMonth - (count - 1 - i), 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  });
};

const months = getLastMonths(6);

export const mediaMetricsMock = {
  // Gastos por plataforma
  platforms: {
    google: {
      spend: 6000,
      previousSpend: 5500,
      ctr: 3.4,
      previousCtr: 3.1,
      cpc: 0.40,
      previousCpc: 0.42
    },
    meta: {
      spend: 5500,
      previousSpend: 5000,
      reach: 320000,
      previousReach: 280000,
      fbFollowers: 1800,
      previousFbFollowers: 1500,
      igFollowers: 2800,
      previousIgFollowers: 2400
    }
  },

  // Métricas de interacción
  interactions: {
    total: 22000,
    previousTotal: 18000,
    comments: 1100,
    previousComments: 950,
    shares: 680,
    previousShares: 520,
    videoPlays: 48000,
    previousVideoPlays: 42000,
    linkClicks: 11200,
    previousLinkClicks: 9800
  },

  // Conversiones
  conversions: {
    club300Registros: 380,
    previousClub300Registros: 320
  },

  // Líneas de tiempo para gráficos
  timeline: [
    {
      month: months[0],
      googleAds: 5000,
      metaAds: 4500,
      metaReach: 250000,
      ctr: 2.8,
      cpc: 0.45,
      interactions: 15000,
      videoPlays: 35000,
      linkClicks: 8500,
      club300Registros: 250
    },
    {
      month: months[1],
      googleAds: 5500,
      metaAds: 5000,
      metaReach: 280000,
      ctr: 3.1,
      cpc: 0.42,
      interactions: 18000,
      videoPlays: 42000,
      linkClicks: 9800,
      club300Registros: 320
    },
    {
      month: months[2],
      googleAds: 6000,
      metaAds: 5500,
      metaReach: 320000,
      ctr: 3.4,
      cpc: 0.40,
      interactions: 22000,
      videoPlays: 48000,
      linkClicks: 11200,
      club300Registros: 380
    },
    {
      month: months[3],
      googleAds: 6200,
      metaAds: 5800,
      metaReach: 350000,
      ctr: 3.6,
      cpc: 0.38,
      interactions: 25000,
      videoPlays: 52000,
      linkClicks: 12500,
      club300Registros: 420
    },
    {
      month: months[4],
      googleAds: 6500,
      metaAds: 6000,
      metaReach: 380000,
      ctr: 3.8,
      cpc: 0.37,
      interactions: 28000,
      videoPlays: 56000,
      linkClicks: 13800,
      club300Registros: 460
    },
    {
      month: months[5],
      googleAds: 6800,
      metaAds: 6200,
      metaReach: 400000,
      ctr: 4.0,
      cpc: 0.36,
      interactions: 32000,
      videoPlays: 60000,
      linkClicks: 15000,
      club300Registros: 500
    }
  ]
};