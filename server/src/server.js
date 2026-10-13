const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const seedRoutes = require('./routes/seedRoutes');
const clearRoutes = require('./routes/clearRoutes');
const rfqRoutes = require('./routes/rfqRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enterprise API Routes
app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/clear', clearRoutes);
app.use('/api/rfq', rfqRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OneShop Enterprise API is running smoothly!' });
});

async function startServer() {
  let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/oneshop';

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB local/remote server');
  } catch (err) {
    console.log('Local MongoDB not available. Starting in-memory MongoDB Server...');
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to In-Memory MongoDB Server successfully!');
  }

  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 OneShop Enterprise Server running on http://localhost:${PORT}`);
    console.log(`=================================================`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
