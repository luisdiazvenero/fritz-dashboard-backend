// src/models/MediaMetric.js
const mediaMetricSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    platform: { type: String, required: true },
    spend: { type: Number, required: true },
    reach: { type: Number, required: true },
    ctr: { type: Number, required: true },
    cpc: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  export const MediaMetric = mongoose.model('MediaMetric', mediaMetricSchema);