// src/mocks/socialMetrics.js
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

export const socialMetricsMock = {
  // Resumen global de todas las plataformas
  summary: {
    youtube: {
      followers: 25600,
      previousFollowers: 22400
    },
    instagram: {
      followers: 38500,
      previousFollowers: 36500
    },
    tiktok: {
      followers: 20500,
      previousFollowers: 17500
    },
    facebook: {
      followers: 28000,
      previousFollowers: 26200
    }
  },

  // Métricas de YouTube
  youtube: {
    newVideos: 12,
    previousNewVideos: 8,
    newSubscribers: 1800,
    previousNewSubscribers: 1500,
    views: 182000,
    previousViews: 168000,
    timeline: [
      { month: months[0], views: 156000, subscribers: 1200 },
      { month: months[1], views: 168000, subscribers: 1500 },
      { month: months[2], views: 182000, subscribers: 1800 },
      { month: months[3], views: 190000, subscribers: 2100 },
      { month: months[4], views: 205000, subscribers: 2400 },
      { month: months[5], views: 220000, subscribers: 2800 }
    ]
  },

  // Métricas de Instagram
  instagram: {
    followers: 38500,
    previousFollowers: 36500,
    newFollowers: 2000,
    previousNewFollowers: 1500,
    impressions: 180000,
    previousImpressions: 150000,
    reach: 110000,
    previousReach: 95000,
    interactions: 22000,
    previousInteractions: 18000,
    timeline: [
      { month: months[0], impressions: 120000, reach: 80000, interactions: 15000 },
      { month: months[1], impressions: 150000, reach: 95000, interactions: 18000 },
      { month: months[2], impressions: 180000, reach: 110000, interactions: 22000 },
      { month: months[3], impressions: 200000, reach: 125000, interactions: 25000 },
      { month: months[4], impressions: 220000, reach: 140000, interactions: 28000 },
      { month: months[5], impressions: 250000, reach: 160000, interactions: 32000 }
    ]
  },

  // Métricas de TikTok
  tiktok: {
    newFollowers: 3000,
    previousNewFollowers: 2500,
    netFollowers: 20500,
    previousNetFollowers: 17500,
    videoViews: 320000,
    previousVideoViews: 280000,
    profileViews: 58000,
    previousProfileViews: 52000,
    likes: 48000,
    previousLikes: 42000,
    shares: 1800,
    previousShares: 1500,
    timeline: [
      { month: months[0], videoViews: 250000, likes: 35000, shares: 1200 },
      { month: months[1], videoViews: 280000, likes: 42000, shares: 1500 },
      { month: months[2], videoViews: 320000, likes: 48000, shares: 1800 },
      { month: months[3], videoViews: 350000, likes: 52000, shares: 2000 },
      { month: months[4], videoViews: 380000, likes: 56000, shares: 2200 },
      { month: months[5], videoViews: 400000, likes: 60000, shares: 2500 }
    ]
  },

  // Métricas de Facebook
  facebook: {
    followers: 28000,
    previousFollowers: 26200,
    newFollowers: 1800,
    previousNewFollowers: 1200,
    timeline: [
      { month: months[0], totalFollowers: 25000, newFollowers: 500 },
      { month: months[1], totalFollowers: 26200, newFollowers: 1200 },
      { month: months[2], totalFollowers: 28000, newFollowers: 1800 },
      { month: months[3], totalFollowers: 29500, newFollowers: 1500 },
      { month: months[4], totalFollowers: 31000, newFollowers: 1500 },
      { month: months[5], totalFollowers: 32800, newFollowers: 1800 }
    ]
  }
};