const express = require('express');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await User.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    res.json({ message: 'All dummy data cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Clear data failed', error: error.message });
  }
});

module.exports = router;
