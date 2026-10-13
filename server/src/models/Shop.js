const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    category: {
      type: String,
      required: true,
      enum: [
        'Grocery & Supermarket',
        'Restaurant & Food',
        'Electronics & Mobiles',
        'Fruits & Vegetables',
        'Pharmacy & Health',
        'General Store',
        'Wholesale & Farming',
        'Dairy & Sweets'
      ],
      default: 'General Store'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80'
    },
    logoImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&q=80'
    },
    address: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    phone: {
      type: String,
      default: '9876543210'
    },
    gstin: {
      type: String,
      default: '07AAAAA1234A1Z5'
    },
    bankAccount: {
      type: String,
      default: 'HDFC Bank - 50100239482'
    },
    deliveryRadiusKm: {
      type: Number,
      default: 5
    },
    isWholesale: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.8
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    verifiedStatus: {
      type: String,
      enum: ['VERIFIED', 'PENDING', 'REJECTED'],
      default: 'VERIFIED'
    },
    subscriptionPlan: {
      type: String,
      enum: ['STARTER', 'PRO', 'WHOLESALE_DEPOT'],
      default: 'PRO'
    },
    subscriptionStatus: {
      type: String,
      enum: ['ACTIVE', 'DUE_SOON', 'EXPIRED'],
      default: 'ACTIVE'
    },
    monthlyRentAmount: {
      type: Number,
      default: 999
    },
    rentBillingCycle: {
      type: String,
      enum: ['MONTHLY', 'YEARLY'],
      default: 'MONTHLY'
    },
    nextRentDueDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    rentHistory: [
      {
        invoiceId: String,
        amount: Number,
        paidAt: Date,
        billingCycle: String,
        status: { type: String, default: 'PAID' }
      }
    ]
  },
  { timestamps: true }
);

shopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', shopSchema);
