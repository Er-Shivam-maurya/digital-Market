const mongoose = require('mongoose');

const rfqSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    category: String,
    quantityRequired: Number,
    unit: String,
    targetPricePerUnit: Number,
    status: {
      type: String,
      enum: ['OPEN', 'QUOTED', 'CLOSED'],
      default: 'OPEN'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('RFQ', rfqSchema);
