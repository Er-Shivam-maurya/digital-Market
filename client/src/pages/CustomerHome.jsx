import React, { useState, useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import ShopCard from '../components/ShopCard';
import InteractiveMap from '../components/InteractiveMap';
import BecomeSellerSection from '../components/BecomeSellerSection';
import Footer from '../components/Footer';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Map, 
  Grid, 
  Store, 
  Sparkles, 
  ChevronRight, 
  User, 
  LogIn, 
  MessageSquare, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Grocery & Supermarket',
  'Restaurant & Food',
  'Electronics & Mobiles',
  'Fruits & Vegetables',
  'Pharmacy & Health',
  'General Store',
  'Wholesale & Farming',
  'Dairy & Sweets'
];

export default function CustomerHome({ onSelectShop, onOpenAuth }) {
  const { user } = useAuth();
  const { userLocation, radiusKm, setRadiusKm, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, setIsLocationModalOpen } = useLocation();
  
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchShops();
  }, [userLocation, radiusKm, selectedCategory, searchQuery]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        lat: userLocation.lat,
        lng: userLocation.lng,
        radius: radiusKm,
        category: selectedCategory,
        search: searchQuery
      });

      const res = await fetch(`/api/shops?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setShops(data.shops || []);
      }
    } catch (err) {
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-4">
      
      {/* Deep Forest Green Hero Banner matching uploaded design reference */}
      <div className="bg-forest-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-forest-800/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-4 relative z-10 flex flex-col items-center justify-center">
          
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-forest-800/80 border border-forest-700 backdrop-blur-md rounded-full text-xs font-extrabold text-amber-300 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Hyper-Local Digital Marketplace Suite</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-center">
            Your Neighborhood, <span className="underline decoration-amber-400">Fully Digitized</span>
          </h1>

          <p className="text-xs sm:text-sm text-forest-100/90 leading-relaxed text-center max-w-2xl mx-auto">
            Order groceries, fresh food, electronics, and daily essentials directly from your nearest local shops or source bulk produce with zero order commission.
          </p>

          {/* White Search Bar Box with Warm Coral Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search shops, products, or categories near you..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs bg-white text-gray-900 shadow-md focus:ring-2 focus:ring-amber-400 focus:outline-none placeholder-gray-400 font-medium"
              />
            </div>
            
            <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-center">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="px-3.5 py-2.5 bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 border border-forest-700"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span className="truncate max-w-[120px]">{userLocation.name.split('/')[0]}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {user ? (
                <div className="px-3.5 py-2.5 bg-forest-800/80 backdrop-blur-md text-white font-extrabold text-xs rounded-xl border border-forest-700 flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* 3 Hero Feature Cards (Matching Image Reference) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4 text-left">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-1">
              <div className="font-extrabold text-xs text-amber-300 flex items-center space-x-1.5">
                <Store className="w-4 h-4 text-amber-300" />
                <span>Browse Local Stores</span>
              </div>
              <p className="text-[11px] text-forest-100/80">Explore neighborhood Kirana, Dairy & Electronics shops within 5 km.</p>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-1">
              <div className="font-extrabold text-xs text-amber-300 flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>Direct Hotline & WhatsApp</span>
              </div>
              <p className="text-[11px] text-forest-100/80">Call or message shopkeepers directly without middleman markups.</p>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-1">
              <div className="font-extrabold text-xs text-amber-300 flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-amber-300" />
                <span>Fast Local Delivery</span>
              </div>
              <p className="text-[11px] text-forest-100/80">Quick 30-minute home delivery directly from your neighborhood store.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-cream-200 space-y-3">
        
        {/* Category Pills Slider */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'bg-cream-100 hover:bg-cream-200 text-gray-700 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Radius Filter & View Toggle Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-gray-100 text-xs">
          
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-700 flex items-center space-x-1 text-[11px]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-forest-800" />
              <span>Radius:</span>
            </span>
            <select
              value={radiusKm}
              onChange={e => setRadiusKm(Number(e.target.value))}
              className="px-2.5 py-1 bg-cream-50 border border-gray-200 rounded-lg font-bold text-gray-800 focus:outline-none text-xs"
            >
              <option value={2}>Within 2 km</option>
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={25}>Within 25 km</option>
              <option value={50}>Within 50 km</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500 font-semibold text-[11px]">{shops.length} Shops Found</span>

            {/* Grid / Map Toggle */}
            <div className="bg-cream-100 p-0.5 rounded-lg flex items-center space-x-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center space-x-1 transition-all ${
                  viewMode === 'grid' ? 'bg-white text-forest-900 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center space-x-1 transition-all ${
                  viewMode === 'map' ? 'bg-white text-forest-900 shadow-2xs' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="py-16 text-center space-y-2">
          <div className="w-8 h-8 border-3 border-forest-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-gray-500">Searching nearby shops...</p>
        </div>
      ) : viewMode === 'map' ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700 px-1">
            <span>📍 Interactive Map View</span>
            <span className="text-forest-800">{userLocation.name}</span>
          </div>
          <InteractiveMap 
            userLocation={userLocation} 
            shops={shops} 
            onSelectShop={onSelectShop} 
          />
        </div>
      ) : shops.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-cream-200">
          <Store className="w-12 h-12 text-gray-300 mx-auto stroke-1" />
          <h3 className="text-base font-bold text-gray-800">No Shops Found in {radiusKm} km Radius</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try expanding your distance radius filter or click the location bar to switch market hubs.
          </p>
          <button
            onClick={() => setRadiusKm(50)}
            className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Expand Radius to 50 km
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map(shop => (
            <ShopCard 
              key={shop._id} 
              shop={shop} 
              onSelectShop={onSelectShop} 
            />
          ))}
        </div>
      )}

      {/* Become a Seller Onboarding Suite */}
      <BecomeSellerSection />

      {/* Forest Green Footer matching uploaded design */}
      <Footer />

    </div>
  );
}
