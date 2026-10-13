const express = require('express');
const Order = require('../models/Order');
const Shop = require('../models/Shop');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customer: req.user._id
    });
    res.status(201).json({ message: 'Order placed', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

router.get('/merchant/orders', authMiddleware, async (req, res) => {
  try {
    const myShops = await Shop.find({ owner: req.user._id });
    const shopIds = myShops.map(s => s._id);
    const orders = await Order.find({ shop: { $in: shopIds } }).populate('customer', 'name phone').sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch merchant orders', error: error.message });
  }
});

router.get('/my/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate('shop', 'name phone address image').sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch my orders', error: error.message });
  }
});

module.exports = router;
