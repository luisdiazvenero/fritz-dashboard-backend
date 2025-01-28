import mongoose from 'mongoose';

const metricHistorySchema = new mongoose.Schema({
    metricId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'metricType'
    },
    metricType: {
        type: String,
        enum: ['web', 'social', 'media'],
        required: true
    },
    changeType: {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true
    },
    oldValue: Object,
    newValue: Object,
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const MetricHistory = mongoose.model('MetricHistory', metricHistorySchema);
