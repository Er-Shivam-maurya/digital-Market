const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const RFQ = require('../models/RFQ');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    console.log('Seeding demo data with digital storefront subscription rent models...');
    
    await User.deleteMany({});
    await Shop.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Delivery.deleteMany({});
    await RFQ.deleteMany({});
    await Complaint.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Create Enterprise Users
    const customerUser = await User.create({
      name: 'Rohan Verma',
      email: 'customer@oneshop.com',
      password: passwordHash,
      role: 'CUSTOMER',
      phone: '9876543210',
      address: 'A-12 Connaught Place, New Delhi'
    });

    const merchantUser = await User.create({
      name: 'Rajesh Gupta',
      email: 'merchant@oneshop.com',
      password: passwordHash,
      role: 'SELLER',
      phone: '9811223344',
      address: 'Shop #4, Main Market, Connaught Place, New Delhi'
    });

    const farmerUser = await User.create({
      name: 'Gurpreet Singh (Kisan)',
      email: 'farmer@oneshop.com',
      password: passwordHash,
      role: 'SELLER',
      phone: '9822334455',
      address: 'Farm Unit #12, Azadpur Mandi, Delhi'
    });

    const buyerUser = await User.create({
      name: 'Taj Palace Hotel Procurements',
      email: 'buyer@oneshop.com',
      password: passwordHash,
      role: 'BUSINESS_BUYER',
      phone: '9833445566',
      address: 'Chanakyapuri, New Delhi'
    });

    const adminUser = await User.create({
      name: 'Master Platform Admin',
      email: 'admin@oneshop.com',
      password: passwordHash,
      role: 'ADMIN',
      phone: '9999988888',
      address: 'OneShop Enterprise HQs, Cyber City, Gurgaon'
    });

    // 2. Create Demo Shops
    const kiranaShop = await Shop.create({
      owner: merchantUser._id,
      name: 'Gupta Ji Super Grocery & Kirana Store',
      description: 'Your trusted neighborhood supermarket for fresh groceries, daily dairy, spices, pulses, and organic staples.',
      category: 'Grocery & Supermarket',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80',
      address: 'Shop #4, Block B, Inner Circle, Connaught Place, New Delhi',
      phone: '9811223344',
      gstin: '07AAAAA1234A1Z5',
      bankAccount: 'HDFC Bank - AC 50100239482',
      deliveryRadiusKm: 5,
      rating: 4.9,
      isOpen: true,
      verifiedStatus: 'VERIFIED',
      subscriptionPlan: 'PRO',
      subscriptionStatus: 'ACTIVE',
      monthlyRentAmount: 999,
      rentBillingCycle: 'MONTHLY',
      nextRentDueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      rentHistory: [
        {
          invoiceId: 'RENT-90214',
          amount: 999,
          paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          billingCycle: 'MONTHLY',
          status: 'PAID'
        }
      ],
      location: {
        type: 'Point',
        coordinates: [77.2195, 28.6315]
      }
    });

    const farmDepot = await Shop.create({
      owner: farmerUser._id,
      name: 'Kisan Mandi Direct Farm Produce & Grain Depot',
      description: 'Direct farm produce depot supplying fresh Sharbati wheat, basmati rice, organic potatoes, and onions to hotels & retail stores.',
      category: 'Wholesale & Farming',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80',
      address: 'Shed #18, Azadpur Grain Mandi, New Delhi',
      phone: '9822334455',
      gstin: '07BBBBB5678B2Z9',
      bankAccount: 'ICICI Bank - AC 00210589321',
      deliveryRadiusKm: 25,
      isWholesale: true,
      rating: 4.8,
      isOpen: true,
      verifiedStatus: 'VERIFIED',
      subscriptionPlan: 'WHOLESALE_DEPOT',
      subscriptionStatus: 'ACTIVE',
      monthlyRentAmount: 1999,
      rentBillingCycle: 'MONTHLY',
      nextRentDueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      rentHistory: [
        {
          invoiceId: 'RENT-81203',
          amount: 1999,
          paidAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          billingCycle: 'MONTHLY',
          status: 'PAID'
        }
      ],
      location: {
        type: 'Point',
        coordinates: [77.1751, 28.7186]
      }
    });

    const electronicsShop = await Shop.create({
      owner: merchantUser._id,
      name: 'Verma Mobile & Electronics World',
      description: 'Authorized store for smartphones, mobile accessories, laptops, smartwatches, and home electronic appliances.',
      category: 'Electronics & Mobiles',
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80',
      address: 'Shop #12, Nehru Place Electronics Market, New Delhi',
      phone: '9811998877',
      gstin: '07CCCCC9012C3Z1',
      bankAccount: 'Axis Bank - AC 912010048291',
      deliveryRadiusKm: 10,
      rating: 4.7,
      isOpen: true,
      verifiedStatus: 'VERIFIED',
      subscriptionPlan: 'PRO',
      subscriptionStatus: 'ACTIVE',
      monthlyRentAmount: 999,
      rentBillingCycle: 'MONTHLY',
      nextRentDueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      rentHistory: [
        {
          invoiceId: 'RENT-70192',
          amount: 999,
          paidAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          billingCycle: 'MONTHLY',
          status: 'PAID'
        }
      ],
      location: {
        type: 'Point',
        coordinates: [77.2512, 28.5494]
      }
    });

    const dairyShop = await Shop.create({
      owner: merchantUser._id,
      name: 'Agrawal Dairy & Fresh Sweets',
      description: 'Fresh cow milk, paneer, pure desi ghee, curd, and authentic traditional Indian sweets.',
      category: 'Dairy & Sweets',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80',
      address: 'Shop #8, Karol Bagh Main Market, New Delhi',
      phone: '9877665544',
      gstin: '07DDDDD3456D4Z8',
      bankAccount: 'SBI Bank - AC 30912384910',
      deliveryRadiusKm: 5,
      rating: 4.9,
      isOpen: true,
      verifiedStatus: 'VERIFIED',
      subscriptionPlan: 'STARTER',
      subscriptionStatus: 'DUE_SOON',
      monthlyRentAmount: 499,
      rentBillingCycle: 'MONTHLY',
      nextRentDueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      rentHistory: [
        {
          invoiceId: 'RENT-60124',
          amount: 499,
          paidAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000),
          billingCycle: 'MONTHLY',
          status: 'PAID'
        }
      ],
      location: {
        type: 'Point',
        coordinates: [77.1905, 28.6518]
      }
    });

    // 3. Create Demo Pending Onboarding Shop for Testing Admin Approvals
    await Shop.create({
      owner: merchantUser._id,
      name: 'Sharma Sweets & Bakers (Pending Verification)',
      description: 'Artisanal bakery and Indian sweets house applying for digital shopfront verification.',
      category: 'Dairy & Sweets',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      address: 'Shop #14, Chandni Chowk, Delhi',
      phone: '9899112233',
      gstin: '07EEEEE7890E5Z2',
      bankAccount: 'PNB Bank - AC 1029384756',
      deliveryRadiusKm: 5,
      rating: 4.6,
      isOpen: true,
      verifiedStatus: 'PENDING',
      subscriptionPlan: 'PRO',
      subscriptionStatus: 'ACTIVE',
      monthlyRentAmount: 999,
      rentBillingCycle: 'MONTHLY',
      nextRentDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      location: {
        type: 'Point',
        coordinates: [77.2300, 28.6500]
      }
    });

    // 4. Create Sample Products
    await Product.create({
      shop: kiranaShop._id,
      name: 'Aashirvaad Shudh Chakki Atta 5kg',
      description: '100% pure whole wheat flour with natural dietary fibres.',
      price: 245,
      costPrice: 195,
      discountPercent: 10,
      taxGst: 5,
      offerLabel: '10% FESTIVAL DISCOUNT',
      isOfferActive: true,
      unit: 'packet',
      category: 'Staples & Flour',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
      stock: 150
    });

    await Product.create({
      shop: kiranaShop._id,
      name: 'Amul Taaza T-Special Milk 1L',
      description: 'Fresh pasteurized homogenized toned milk.',
      price: 68,
      costPrice: 58,
      discountPercent: 0,
      taxGst: 0,
      unit: 'pouch',
      category: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80',
      stock: 80
    });

    console.log('Database seeded with digital storefront subscription rent & merchant onboarding models!');
    return { success: true, message: 'Seeded demo data with merchant onboarding models!' };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = { seedDatabase };
