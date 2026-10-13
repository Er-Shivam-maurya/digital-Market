const express = require('express');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Complaint = require('../models/Complaint');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Middleware: Verify Admin Access
const verifyAdminRole = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin role required' });
  }
};

// GET /api/admin/dashboard - Enterprise Admin Subscription & Rent Analytics
router.get('/dashboard', authMiddleware, verifyAdminRole, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalShops = await Shop.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const allOrders = await Order.find({ status: { $ne: 'CANCELLED' } });
    const totalPlatformGMV = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Calculate Monthly Recurring Revenue (MRR) from Shopkeeper Store Rents
    const allShops = await Shop.find().populate('owner', 'name email phone');
    const activeSubscribedShops = allShops.filter(s => s.subscriptionStatus === 'ACTIVE' || s.subscriptionStatus === 'DUE_SOON');
    const totalMonthlyRentMRR = activeSubscribedShops.reduce((sum, s) => sum + (s.monthlyRentAmount || 999), 0);

    const fraudRiskLogs = [
      { id: 'RISK-101', description: 'Rapid order placement anomaly detected in Connaught Place area', score: 88, level: 'MEDIUM' },
      { id: 'RISK-102', description: 'Unusual IP address frequency during checkout attempt', score: 42, level: 'LOW' }
    ];

    res.json({
      stats: {
        totalUsers,
        totalShops,
        totalProducts,
        totalOrders,
        totalPlatformGMV,
        totalMonthlyRentMRR,
        activeSubscribedShopsCount: activeSubscribedShops.length
      },
      fraudRiskLogs,
      shops: allShops
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin dashboard', error: error.message });
  }
});

// PATCH /api/admin/shops/:id/verify-status - Approve or Reject Shop Onboarding
router.patch('/shops/:id/verify-status', authMiddleware, verifyAdminRole, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['VERIFIED', 'REJECTED', 'PENDING'].includes(status)) {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.verifiedStatus = status;
    await shop.save();

    res.json({ message: `Shop status updated to ${status}`, shop });
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop status', error: error.message });
  }
});

// GET /api/admin/users - Get all registered users
router.get('/users', authMiddleware, verifyAdminRole, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// GET /api/admin/complaints - Get all dispute tickets
router.get('/complaints', authMiddleware, verifyAdminRole, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
});

// PATCH /api/admin/complaints/:id/status - Update complaint status
router.patch('/complaints/:id/status', authMiddleware, verifyAdminRole, async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status;
    if (resolutionNotes) complaint.resolutionNotes = resolutionNotes;
    await complaint.save();

    res.json({ message: 'Complaint updated', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
});

// POST /api/admin/shops/:id/pay-rent - Simulate rent payment or grant extension
router.post('/shops/:id/pay-rent', authMiddleware, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    const invoiceId = `RENT-${Date.now().toString().substring(6)}`;
    const rentAmount = shop.monthlyRentAmount || 999;

    shop.subscriptionStatus = 'ACTIVE';
    shop.nextRentDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    shop.rentHistory.unshift({
      invoiceId,
      amount: rentAmount,
      paidAt: new Date(),
      billingCycle: shop.rentBillingCycle || 'MONTHLY',
      status: 'PAID'
    });

    await shop.save();
    res.json({ message: 'Digital Storefront Rent Paid successfully!', shop });
  } catch (error) {
    res.status(500).json({ message: 'Error processing rent payment', error: error.message });
  }
});

module.exports = router;
