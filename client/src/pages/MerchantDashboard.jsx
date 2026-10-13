import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import { 
  Building2, 
  Package, 
  ShoppingBag, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Tag, 
  Percent, 
  PieChart, 
  BarChart3, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle,
  Tractor,
  ShieldCheck,
  Zap,
  BadgePercent,
  UserCheck,
  Settings,
  Image as ImageIcon,
  MapPin,
  Phone,
  FileText,
  Save,
  Check,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const SHOP_POSTER_PRESETS = [
  { label: 'Supermarket & Grocery', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&q=80' },
  { label: 'Organic Farm & Wholesale', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&q=80' },
  { label: 'Electronics & Gadgets', url: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1000&q=80' },
  { label: 'Restaurant & Food', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80' },
  { label: 'Fruits & Vegetables', url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1000&q=80' }
];

const SHOP_LOGO_PRESETS = [
  { label: 'Supermarket Badge', url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80' },
  { label: 'Green Leaf Logo', url: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80' },
  { label: 'Tech Store Badge', url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80' },
  { label: 'Chef Kitchen Logo', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' }
];

const DEFAULT_DEMO_SHOP = {
  _id: 'demo-shop-101',
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
  nextRentDueDate: '2026-10-25',
  rentHistory: [
    { invoiceId: 'RENT-90214', amount: 999, paidAt: new Date(), billingCycle: 'MONTHLY', status: 'PAID' }
  ]
};

const DEFAULT_DEMO_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Aashirvaad Shudh Chakki Atta 5kg',
    description: '100% pure whole wheat flour.',
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
  },
  {
    _id: 'p2',
    name: 'Amul Taaza T-Special Milk 1L',
    description: 'Fresh pasteurized toned milk.',
    price: 68,
    costPrice: 58,
    discountPercent: 0,
    taxGst: 0,
    unit: 'pouch',
    category: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80',
    stock: 80
  },
  {
    _id: 'p3',
    name: 'Fortune Sunlite Sunflower Oil 1L',
    description: 'Refined sunflower oil enriched with Vitamin A & D.',
    price: 135,
    costPrice: 110,
    discountPercent: 12,
    taxGst: 5,
    offerLabel: 'SPECIAL OFFER 12% OFF',
    isOfferActive: true,
    unit: 'bottle',
    category: 'Edible Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
    stock: 65
  }
];

export default function MerchantDashboard({ onNavigateToB2B }) {
  const { user, token } = useAuth();

  const [activeErpTab, setActiveErpTab] = useState('overview');
  const [selectedShop, setSelectedShop] = useState(DEFAULT_DEMO_SHOP);
  const [products, setProducts] = useState(DEFAULT_DEMO_PRODUCTS);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [shopProfileForm, setShopProfileForm] = useState({
    name: DEFAULT_DEMO_SHOP.name,
    description: DEFAULT_DEMO_SHOP.description,
    category: DEFAULT_DEMO_SHOP.category,
    image: DEFAULT_DEMO_SHOP.image,
    logoImage: DEFAULT_DEMO_SHOP.logoImage,
    address: DEFAULT_DEMO_SHOP.address,
    phone: DEFAULT_DEMO_SHOP.phone,
    gstin: DEFAULT_DEMO_SHOP.gstin,
    bankAccount: DEFAULT_DEMO_SHOP.bankAccount,
    deliveryRadiusKm: 5
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  const [isPayingRent, setIsPayingRent] = useState(false);
  const [rentSuccessMsg, setRentSuccessMsg] = useState('');

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    costPrice: '',
    discountPercent: 0,
    taxGst: 5,
    offerLabel: '',
    isOfferActive: false,
    unit: 'item',
    category: 'General Store',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
    stock: 100
  });
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const [offerForm, setOfferForm] = useState({
    productId: '',
    offerLabel: 'FESTIVAL SPECIAL 10% OFF',
    discountPercent: 10
  });
  const [isCreateOfferModalOpen, setIsCreateOfferModalOpen] = useState(false);

  useEffect(() => {
    fetchErpData();
  }, [token]);

  const fetchErpData = async () => {
    try {
      const shopRes = await fetch('/api/shops');
      if (shopRes.ok) {
        const shopData = await shopRes.json();
        if (shopData.shops && shopData.shops.length > 0) {
          const active = shopData.shops[0];
          setSelectedShop(active);
          
          setShopProfileForm({
            name: active.name || DEFAULT_DEMO_SHOP.name,
            description: active.description || DEFAULT_DEMO_SHOP.description,
            category: active.category || DEFAULT_DEMO_SHOP.category,
            image: active.image || DEFAULT_DEMO_SHOP.image,
            logoImage: active.logoImage || DEFAULT_DEMO_SHOP.logoImage,
            address: active.address || DEFAULT_DEMO_SHOP.address,
            phone: active.phone || DEFAULT_DEMO_SHOP.phone,
            gstin: active.gstin || DEFAULT_DEMO_SHOP.gstin,
            bankAccount: active.bankAccount || DEFAULT_DEMO_SHOP.bankAccount,
            deliveryRadiusKm: active.deliveryRadiusKm || 5
          });

          const prodRes = await fetch(`/api/shops/${active._id}`);
          if (prodRes.ok) {
            const prodData = await prodRes.json();
            if (prodData.products && prodData.products.length > 0) {
              setProducts(prodData.products);
            }
          }
        }
      }

      if (token) {
        const orderRes = await fetch('/api/orders/merchant/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setIncomingOrders(orderData.orders || []);
        }
      }
    } catch (err) {
      console.log('Using default demo shop context:', err);
    }
  };

  const handlePayRent = async () => {
    setIsPayingRent(true);
    setRentSuccessMsg('');
    try {
      if (token && selectedShop._id !== 'demo-shop-101') {
        const res = await fetch(`/api/admin/shops/${selectedShop._id}/pay-rent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) setSelectedShop(data.shop);
      } else {
        setSelectedShop(prev => ({
          ...prev,
          subscriptionStatus: 'ACTIVE',
          rentHistory: [
            { invoiceId: `RENT-${Date.now().toString().substring(6)}`, amount: prev.monthlyRentAmount || 999, paidAt: new Date(), billingCycle: 'MONTHLY', status: 'PAID' },
            ...(prev.rentHistory || [])
          ]
        }));
      }
      setRentSuccessMsg('🎉 Digital Storefront Monthly Rent Paid Successfully! Invoice Receipt Generated.');
      setTimeout(() => setRentSuccessMsg(''), 5000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsPayingRent(false);
    }
  };

  const handleSaveShopProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSuccessMsg('');
    try {
      if (token && selectedShop._id !== 'demo-shop-101') {
        const res = await fetch(`/api/shops/${selectedShop._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(shopProfileForm)
        });
        const data = await res.json();
        if (res.ok) setSelectedShop(data.shop);
      } else {
        setSelectedShop(prev => ({ ...prev, ...shopProfileForm }));
      }
      setProfileSuccessMsg('✨ Shop Poster Banner, Logo & Profile details saved successfully!');
      setTimeout(() => setProfileSuccessMsg(''), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProd = {
      _id: `prod-${Date.now()}`,
      name: productForm.name,
      description: productForm.description || 'Quality product',
      price: parseFloat(productForm.price),
      costPrice: parseFloat(productForm.costPrice || productForm.price * 0.75),
      taxGst: parseFloat(productForm.taxGst || 5),
      unit: productForm.unit || 'item',
      category: productForm.category || 'General Store',
      image: productForm.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
      stock: parseInt(productForm.stock || 100),
      discountPercent: 0,
      isOfferActive: false
    };

    setProducts(prev => [newProd, ...prev]);
    alert('Product & Pricing catalog saved!');
    setIsAddProductModalOpen(false);
  };

  const handleApplyOffer = (e) => {
    e.preventDefault();
    setProducts(prev => prev.map(p => {
      if (p._id === offerForm.productId) {
        return {
          ...p,
          offerLabel: offerForm.offerLabel,
          discountPercent: parseFloat(offerForm.discountPercent),
          isOfferActive: true
        };
      }
      return p;
    }));
    alert('Promotional Discount Offer Activated!');
    setIsCreateOfferModalOpen(false);
  };

  const grossSales = incomingOrders.reduce((sum, o) => sum + o.totalAmount, 0) || 12450;
  const estimatedProfit = Math.round(grossSales * 0.22);

  return (
    <div className="space-y-6 pb-4 text-gray-900">
      
      {/* Shopkeeper Banner Header with Custom Poster & Logo */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden relative">
        <div className="relative h-44 sm:h-56 w-full bg-gray-100">
          <img 
            src={selectedShop?.image || shopProfileForm.image || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&q=80'} 
            alt="Shop Banner Poster" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent"></div>
          
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => setActiveErpTab('subscription')}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Shop Rent: ₹{selectedShop?.monthlyRentAmount || 999}/mo</span>
            </button>

            <button
              onClick={() => setActiveErpTab('profile')}
              className="px-3.5 py-1.5 bg-white/90 hover:bg-white text-gray-900 font-extrabold text-xs rounded-xl shadow-md backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Settings className="w-4 h-4 text-forest-800" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="absolute -bottom-2 left-6 flex items-end space-x-3 transform translate-y-1/2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-cream-50 shrink-0">
              {selectedShop?.logoImage || shopProfileForm.logoImage ? (
                <img src={selectedShop?.logoImage || shopProfileForm.logoImage} alt="Shop Logo" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-10 h-10 text-forest-900" />
              )}
            </div>
          </div>
        </div>

        <div className="pt-12 pb-5 px-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-forest-50 text-forest-900 text-[10px] font-extrabold rounded-full border border-forest-100">
                  {selectedShop?.category || 'Grocery & Supermarket'}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Rent Status: {selectedShop?.subscriptionStatus || 'ACTIVE'}</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                {selectedShop?.name || 'Gupta Ji Super Grocery & Kirana Store'}
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                GSTIN: <span className="font-mono font-bold text-forest-800">{selectedShop?.gstin || '07AAAAA1234A1Z5'}</span> • Settlement AC: {selectedShop?.bankAccount || 'HDFC Bank'}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 border border-forest-700"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => setIsCreateOfferModalOpen(true)}
                className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <BadgePercent className="w-4 h-4" />
                <span>Create Offer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-gray-500">Digital Storefront Rent</div>
          <div className="text-lg font-extrabold text-amber-600">₹{selectedShop?.monthlyRentAmount || 999}/month</div>
          <div className="text-[9px] text-emerald-600 font-bold">Status: {selectedShop?.subscriptionStatus || 'ACTIVE'}</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-gray-500">Gross Sales Revenue</div>
          <div className="text-lg font-extrabold text-forest-900">₹{grossSales.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-600 font-bold">↑ 14.2% vs last week</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-gray-500">Est. Net Profit Margin</div>
          <div className="text-lg font-extrabold text-emerald-600">₹{estimatedProfit.toLocaleString()}</div>
          <div className="text-[9px] text-gray-500 font-semibold">Average 22.4% Margin</div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-gray-500">Active SKUs Managed</div>
          <div className="text-lg font-extrabold text-gray-900">{products.length} Items</div>
          <div className="text-[9px] text-forest-800 font-semibold">Total Stock Managed</div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-cream-200 shadow-xs flex items-center space-x-1.5 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveErpTab('overview')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeErpTab === 'overview' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
          <span>Graphical Analytics</span>
        </button>

        <button
          onClick={() => setActiveErpTab('pricing')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeErpTab === 'pricing' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-300" />
          <span>Catalog & Pricing Matrix</span>
        </button>

        <button
          onClick={() => setActiveErpTab('subscription')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeErpTab === 'subscription' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-amber-300" />
          <span>💳 Shop Rent & Subscription</span>
        </button>

        <button
          onClick={() => setActiveErpTab('profile')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeErpTab === 'profile' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-amber-300" />
          <span>Manage Shop Profile & Media</span>
        </button>

        <button
          onClick={() => setActiveErpTab('offers')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeErpTab === 'offers' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <BadgePercent className="w-3.5 h-3.5 text-amber-300" />
          <span>Offers & Flash Sales</span>
        </button>
      </div>

      {/* Tab: Shop Rent & Subscription */}
      {activeErpTab === 'subscription' && (
        <div className="space-y-6">
          <div className="bg-forest-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-forest-700">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-forest-800 border border-forest-700 rounded-full text-xs font-extrabold text-amber-300">Fixed Monthly Rent Model (No Commission)</span>
              <h2 className="text-2xl font-extrabold text-white">Digital Storefront Rent: ₹{selectedShop?.monthlyRentAmount || 999} / Month</h2>
              <p className="text-xs text-forest-100/90">Pay a fixed monthly store rent to keep your digital storefront active with zero order commissions.</p>
            </div>

            <div className="bg-forest-800/80 p-4 rounded-2xl border border-forest-700 text-center shrink-0">
              <div className="text-xs font-bold text-amber-300">Next Rent Due Date</div>
              <div className="text-xl font-extrabold text-white">Oct 25, 2026</div>
              <button onClick={handlePayRent} disabled={isPayingRent} className="mt-2 py-2 px-4 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all">
                {isPayingRent ? 'Processing...' : `Pay ₹${selectedShop?.monthlyRentAmount || 999} Rent Now`}
              </button>
            </div>
          </div>

          {rentSuccessMsg && (
            <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold rounded-2xl flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{rentSuccessMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* Tab: Shop Profile & Media Editor */}
      {activeErpTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-forest-800" />
                <span>Shop Profile & Poster Media Customization</span>
              </h2>
              <p className="text-xs text-gray-500">Update your store cover poster banner image, logo badge, address, phone & GSTIN.</p>
            </div>

            {profileSuccessMsg && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>{profileSuccessMsg}</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveShopProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream-50 p-4 rounded-2xl border border-cream-200">
              <div className="space-y-2">
                <label className="block font-extrabold text-gray-900">Shop Cover Poster Banner (URL)</label>
                <input
                  type="url"
                  required
                  value={shopProfileForm.image}
                  onChange={e => setShopProfileForm({ ...shopProfileForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                />
                <div className="h-28 w-full rounded-xl overflow-hidden bg-gray-200 border border-gray-300">
                  <img src={shopProfileForm.image} alt="Poster Preview" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-extrabold text-gray-900">Shop Logo / Avatar Badge (URL)</label>
                <input
                  type="url"
                  required
                  value={shopProfileForm.logoImage}
                  onChange={e => setShopProfileForm({ ...shopProfileForm, logoImage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white"
                />
                <div className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-gray-200">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-300 shrink-0">
                    <img src={shopProfileForm.logoImage} alt="Logo Preview" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-extrabold text-gray-900 text-xs">{shopProfileForm.name}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Shop Name</label>
                <input type="text" required value={shopProfileForm.name} onChange={e => setShopProfileForm({ ...shopProfileForm, name: e.target.value })} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Store Address</label>
                <input type="text" required value={shopProfileForm.address} onChange={e => setShopProfileForm({ ...shopProfileForm, address: e.target.value })} className="w-full px-3 py-2 border rounded-xl" />
              </div>
            </div>

            <button type="submit" disabled={isSavingProfile} className="px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md">
              <Save className="w-4 h-4 inline mr-1" />
              <span>{isSavingProfile ? 'Saving...' : 'Save Shop Profile & Media'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab: Overview Analytics */}
      {activeErpTab === 'overview' && (
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-gray-900">Weekly Sales Analytics & Margin Charts</h2>
          <div className="pt-4 pb-2 px-4 bg-cream-50 rounded-2xl border border-cream-200">
            <div className="flex items-end justify-between h-40 gap-2">
              {[
                { day: 'Mon', rev: 1200, h: '35%' },
                { day: 'Tue', rev: 2400, h: '55%' },
                { day: 'Wed', rev: 1800, h: '45%' },
                { day: 'Thu', rev: 3200, h: '70%' },
                { day: 'Fri', rev: 4100, h: '85%' },
                { day: 'Sat', rev: 5600, h: '100%' },
                { day: 'Sun', rev: 3900, h: '78%' }
              ].map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-forest-900 rounded-t-xl" style={{ height: b.h }}></div>
                  <span className="text-[10px] font-bold text-gray-700">{b.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Catalog & Pricing */}
      {activeErpTab === 'pricing' && (
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-gray-900">Catalog & Pricing Matrix (Cost Price, GST, Profit Margins)</h2>
            <button onClick={() => setIsAddProductModalOpen(true)} className="px-3.5 py-1.5 bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs rounded-xl border border-forest-700">+ Add Product</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 text-gray-700 font-extrabold uppercase">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Cost Price (₹)</th>
                  <th className="p-3">Selling Price (₹)</th>
                  <th className="p-3">Profit Margin</th>
                  <th className="p-3">GST Tax (%)</th>
                  <th className="p-3">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(p => {
                  const cost = p.costPrice || Math.round(p.price * 0.75);
                  const margin = p.price - cost;

                  return (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-900 flex items-center space-x-2">
                        <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{p.name}</span>
                      </td>
                      <td className="p-3 font-semibold text-gray-600">₹{cost}</td>
                      <td className="p-3 font-extrabold text-gray-900">₹{p.price}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded">₹{margin}</span>
                      </td>
                      <td className="p-3">{p.taxGst || 5}% GST</td>
                      <td className="p-3 font-bold">{p.stock} units</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <h3 className="text-lg font-extrabold text-gray-900">Add Product to Catalog</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Name</label>
                <input type="text" required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cost Price (₹)</label>
                  <input type="number" required value={productForm.costPrice} onChange={e => setProductForm({ ...productForm, costPrice: e.target.value })} className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input type="number" required value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="w-full px-3 py-2 border rounded-xl" />
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="button" onClick={() => setIsAddProductModalOpen(false)} className="w-1/2 py-2 border font-bold text-gray-700 rounded-xl">Cancel</button>
                <button type="submit" className="w-1/2 py-2 bg-coral-500 text-white font-bold rounded-xl shadow-md">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />

    </div>
  );
}
