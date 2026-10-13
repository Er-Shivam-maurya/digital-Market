const express = require('express');
const bcrypt = require('bcryptjs');
const Shop = require('../models/Shop');
const User = require('../models/User');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');
const { calculateDistanceKm } = require('../utils/distance');

const router = express.Router();

// GET /api/shops - Nearby shop discovery with distance calculation
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius = 5, category, search } = req.query;
    const userLat = parseFloat(lat) || 28.6139;
    const userLng = parseFloat(lng) || 77.209;
    const searchRadius = parseFloat(radius) || 5;

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const allShops = await Shop.find(query).populate('owner', 'name email phone');

    const shopsWithDistance = allShops
      .map(shop => {
        const [shopLng, shopLat] = shop.location.coordinates;
        const distance = calculateDistanceKm(userLat, userLng, shopLat, shopLng);
        return {
          ...shop.toObject(),
          distanceKm: distance
        };
      })
      .filter(shop => shop.distanceKm <= searchRadius)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    res.json({ shops: shopsWithDistance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error: error.message });
  }
});

// GET /api/shops/status/check - Public status lookup by email, phone or shop name
router.get('/status/check', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search email, phone or shop name required' });
    }

    const cleanQuery = query.trim();

    // Check by user email or phone
    const user = await User.findOne({
      $or: [{ email: cleanQuery }, { phone: cleanQuery }]
    });

    let shop = null;
    if (user) {
      shop = await Shop.findOne({ owner: user._id });
    } else {
      shop = await Shop.findOne({
        $or: [{ name: { $regex: cleanQuery, $options: 'i' } }, { phone: cleanQuery }]
      });
    }

    if (!shop) {
      return res.status(404).json({ message: 'No registered merchant found matching this email or phone.' });
    }

    res.json({
      shopName: shop.name,
      category: shop.category,
      verifiedStatus: shop.verifiedStatus,
      ownerEmail: user ? user.email : 'merchant@oneshop.com',
      registeredAt: shop.createdAt,
      address: shop.address,
      portalUrl: 'http://localhost:3000/seller'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking shop status', error: error.message });
  }
});

// POST /api/shops/register-merchant - Public Merchant Onboarding Registration Endpoint
router.post('/register-merchant', async (req, res) => {
  try {
    const { name, email, password, phone, shopName, category, address, gstin, bankAccount, lat, lng } = req.body;

    if (!email || !password || !name || !shopName) {
      return res.status(400).json({ message: 'Full Name, Email, Password, and Shop Name are required' });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    let merchantUser = existingUser;

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(password, 10);
      merchantUser = await User.create({
        name,
        email,
        password: passwordHash,
        role: 'SELLER',
        phone: phone || '9876543210',
        address: address || 'Main Market'
      });
    }

    // Create Shop with PENDING status
    const newShop = await Shop.create({
      owner: merchantUser._id,
      name: shopName,
      description: `${shopName} - Quality products delivered directly to local customers.`,
      category: category || 'General Store',
      address: address || 'Main Market',
      phone: phone || merchantUser.phone,
      gstin: gstin || '07AAAAA1234A1Z5',
      bankAccount: bankAccount || 'HDFC Bank - AC 50100239482',
      verifiedStatus: 'PENDING',
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng) || 77.209, parseFloat(lat) || 28.6139]
      }
    });

    res.status(201).json({
      message: 'Merchant registered successfully! Submitted for Master Admin verification.',
      credentials: {
        email: merchantUser.email,
        password: password,
        merchantId: `MERCHANT-${newShop._id.toString().substring(18).toUpperCase()}`,
        shopName: newShop.name,
        verifiedStatus: newShop.verifiedStatus
      },
      shop: newShop
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering merchant', error: error.message });
  }
});

// GET /api/shops/my/shops - Get current logged in merchant's shops
router.get('/my/shops', authMiddleware, async (req, res) => {
  try {
    const shops = await Shop.find({ owner: req.user._id });
    res.json({ shops });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching my shops', error: error.message });
  }
});

// GET /api/shops/:id - Get shop details and its catalog products
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('owner', 'name email phone');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const products = await Product.find({ shop: shop._id });
    res.json({ shop, products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop details', error: error.message });
  }
});

// POST /api/shops - Create a new digital shopfront
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, image, logoImage, address, lat, lng, phone, gstin, bankAccount, isWholesale, deliveryRadiusKm } = req.body;

    const newShop = new Shop({
      owner: req.user._id,
      name,
      description,
      category,
      image: image || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80',
      logoImage: logoImage || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&q=80',
      address,
      phone: phone || req.user.phone,
      gstin: gstin || '07AAAAA1234A1Z5',
      bankAccount: bankAccount || 'HDFC Bank - 50100239482',
      deliveryRadiusKm: deliveryRadiusKm || 5,
      isWholesale: !!isWholesale,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng) || 77.209, parseFloat(lat) || 28.6139]
      }
    });

    await newShop.save();
    res.status(201).json({ message: 'Shop created successfully', shop: newShop });
  } catch (error) {
    res.status(500).json({ message: 'Error creating shop', error: error.message });
  }
});

// PUT /api/shops/:id - Update Shop Profile (Poster, Logo, Details)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, image, logoImage, address, phone, gstin, bankAccount, deliveryRadiusKm, isOpen } = req.body;

    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    if (name) shop.name = name;
    if (description !== undefined) shop.description = description;
    if (category) shop.category = category;
    if (image) shop.image = image;
    if (logoImage) shop.logoImage = logoImage;
    if (address) shop.address = address;
    if (phone) shop.phone = phone;
    if (gstin) shop.gstin = gstin;
    if (bankAccount) shop.bankAccount = bankAccount;
    if (deliveryRadiusKm) shop.deliveryRadiusKm = Number(deliveryRadiusKm);
    if (isOpen !== undefined) shop.isOpen = isOpen;

    await shop.save();
    res.json({ message: 'Shop profile updated successfully', shop });
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop profile', error: error.message });
  }
});

module.exports = router;
