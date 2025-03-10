// src/models/SocialMetric.js
const socialMetricSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  platform: { type: String, required: true, enum: ['YouTube', 'Instagram', 'TikTok', 'Facebook'] },
  account: { type: String, required: true }, // NUEVO CAMPO
  followers: { type: Number, required: true },
  views: { type: Number, required: true },
  interactions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const SocialMetric = mongoose.model('SocialMetric', socialMetricSchema);
