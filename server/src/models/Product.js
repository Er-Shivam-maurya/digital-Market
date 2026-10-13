const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true
    },
    costPrice: {
      type: Number,
      default: 0
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    taxGst: {
      type: Number,
      default: 5
    },
    offerLabel: {
      type: String,
      default: ''
    },
    isOfferActive: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: 'item'
    },
    category: {
      type: String,
      default: 'General'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80'
    },
    stock: {
      type: Number,
      default: 100
    },
    isB2B: {
      type: Boolean,
      default: false
    },
    moq: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
