import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import { 
  ArrowLeft, 
  Store, 
  Phone, 
  MessageSquare, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles,
  Share2,
  Clock,
  ShieldCheck,
  Building2,
  Megaphone
} from 'lucide-react';

export default function DigitalShopfront({ shopId, onBack, onOpenCart }) {
  const { addToCart } = useAuth();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (shopId) {
      fetchShopData();
    }
  }, [shopId]);

  const fetchShopData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/shops/${shopId}`);
      const data = await res.json();
      if (res.ok) {
        setShop(data.shop);
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Error fetching shopfront:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (pId, delta) => {
    setQuantities(prev => {
      const current = prev[pId] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [pId]: updated };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty);
    setQuantities(prev => ({ ...prev, [product._id]: 0 }));
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-2">
        <div className="w-8 h-8 border-3 border-forest-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-gray-500">Loading Digital Shopfront...</p>
      </div>
    );
  }

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6 pb-4">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 bg-white hover:bg-cream-100 border border-cream-200 rounded-xl font-bold text-xs text-gray-700 shadow-2xs transition-colors flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4 text-forest-800" />
          <span>Back to Nearby Shops</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Digital Shopfront Link Copied to Clipboard!');
            }}
            className="px-3.5 py-1.5 bg-white hover:bg-cream-100 border border-cream-200 rounded-xl font-bold text-xs text-gray-700 shadow-2xs transition-colors flex items-center space-x-1"
          >
            <Share2 className="w-3.5 h-3.5 text-forest-800" />
            <span>Share Storefront</span>
          </button>
        </div>
      </div>

      {/* Individual Branded Digital Store Cover & Avatar */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
        
        <div className="relative h-48 sm:h-64 w-full bg-gray-100">
          <img 
            src={shop?.image || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&q=80'} 
            alt={shop?.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent"></div>

          <div className="absolute top-4 left-4 bg-forest-900 text-white px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1 shadow-md border border-forest-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Merchant Storefront</span>
          </div>

          <div className="absolute -bottom-2 left-6 flex items-end space-x-4 transform translate-y-1/2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center bg-cream-50 shrink-0">
              {shop?.logoImage ? (
                <img src={shop.logoImage} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-10 h-10 text-forest-900" />
              )}
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-6 sm:px-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-forest-50 text-forest-900 text-[10px] font-extrabold rounded-full border border-forest-100">
                  {shop?.category || 'Grocery & Supermarket'}
                </span>
                <span className="flex items-center space-x-1 text-amber-600 font-extrabold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{shop?.rating || 4.9} rating</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                {shop?.name || 'Gupta Ji Super Grocery & Kirana Store'}
              </h1>
              <p className="text-xs text-gray-500 font-medium flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-forest-800" />
                <span>{shop?.address}</span>
              </p>
            </div>

            {/* Direct Hotlines: Call & WhatsApp Buttons in Coral Accent */}
            <div className="flex items-center space-x-2 shrink-0">
              <a
                href={`tel:${shop?.phone || '9876543210'}`}
                className="px-4 py-2.5 bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5 border border-forest-700"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Store</span>
              </a>

              <a
                href={`https://wa.me/91${shop?.phone || '9876543210'}?text=Hello%20${encodeURIComponent(shop?.name || 'Shopkeeper')},%20I%20want%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Announcement Ticker */}
          <div className="p-3 bg-cream-50 border border-cream-200 rounded-2xl flex items-center space-x-2 text-xs text-forest-950 font-bold">
            <Megaphone className="w-4 h-4 text-coral-500 shrink-0" />
            <span className="truncate">📢 Store Offer: 10% OFF on all fresh grocery staples. Fast 30-min home delivery!</span>
          </div>

        </div>
      </div>

      {/* Catalog Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-cream-200 shadow-xs flex items-center space-x-2 overflow-x-auto">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 px-2">Catalog:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              selectedCategory === cat ? 'bg-forest-900 text-white shadow-xs' : 'bg-cream-100 hover:bg-cream-200 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const qty = quantities[product._id] || 0;

          return (
            <div key={product._id} className="bg-white rounded-3xl border border-cream-200 shadow-xs hover:shadow-md transition-all overflow-hidden p-4 flex flex-col justify-between space-y-3">
              
              <div className="space-y-2">
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.isOfferActive && (
                    <span className="absolute top-2 left-2 bg-coral-500 text-white px-2.5 py-0.5 rounded-md text-[10px] font-extrabold shadow-sm">
                      {product.offerLabel || `${product.discountPercent}% OFF`}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 leading-snug">{product.name}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{product.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-gray-900">₹{product.price}</span>
                    <span className="text-[11px] text-gray-400 font-medium ml-1">/ {product.unit || 'item'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-forest-800 bg-forest-50 px-2 py-0.5 rounded-md border border-forest-100">
                    In Stock ({product.stock})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-cream-100 p-1 rounded-xl shrink-0 border border-gray-200">
                    <button
                      onClick={() => handleQuantityChange(product._id, -1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-900">{qty || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(product._id, 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-gray-200 text-gray-800 font-bold flex items-center justify-center shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <Footer />

    </div>
  );
}
