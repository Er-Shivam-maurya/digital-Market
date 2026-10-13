import React, { useState } from 'react';
import CustomerHome from '../pages/CustomerHome';
import DigitalShopfront from '../pages/DigitalShopfront';
import WholesaleMarketplace from '../pages/WholesaleMarketplace';
import MyOrders from '../pages/MyOrders';
import ProductCompareModal from '../components/ProductCompareModal';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { Store, Compass, Tractor, Package, ShoppingBag, MapPin, User, LogOut } from 'lucide-react';

export default function CustomerApp({ onOpenAuth, onOpenCart }) {
  const { user, logout, cart } = useAuth();
  const { userLocation, setIsLocationModalOpen } = useLocation();

  const [activeTab, setActiveTab] = useState('shops');
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleSelectShop = (shop) => {
    setSelectedShopId(shop._id);
    setActiveTab('digital-shop');
  };

  const totalCartCount = cart.reduce((c, i) => c + i.quantity, 0);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans text-gray-900">
      
      {/* Navbar with White/Cream BG, Forest Green Logo and Navigation Links */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-xs">
        <div className="w-full max-w-[95%] mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('shops')}>
              <div className="w-10 h-10 rounded-2xl bg-forest-900 flex items-center justify-center text-white shadow-md border border-forest-800">
                <Store className="w-5.5 h-5.5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-forest-900">OneShop</span>
                  <span className="px-2.5 py-0.5 text-[9px] font-extrabold bg-forest-50 text-forest-900 rounded-full border border-forest-100 uppercase">
                    Customer App
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 hidden sm:block">Hyper-Local Shop Discovery & Ordering</p>
              </div>
            </div>

            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 bg-cream-50 hover:bg-cream-200 transition-colors rounded-full text-xs font-bold text-gray-800 border border-cream-200"
            >
              <MapPin className="w-3.5 h-3.5 text-forest-800 shrink-0" />
              <span className="truncate max-w-[160px]">{userLocation.name}</span>
            </button>

            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('shops')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                  activeTab === 'shops' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-700 hover:bg-cream-100'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                <span>Nearby Shops</span>
              </button>

              <button
                onClick={() => setActiveTab('b2b')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                  activeTab === 'b2b' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-700 hover:bg-cream-100'
                }`}
              >
                <Tractor className="w-3.5 h-3.5 text-amber-300" />
                <span>Wholesale B2B</span>
              </button>

              {user ? (
                <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                  <span className="text-xs font-extrabold text-gray-900 hidden sm:inline">{user.name}</span>
                  <button onClick={logout} className="p-1.5 text-gray-500 hover:text-coral-600" title="Logout">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main App Content */}
      <main className="flex-1 w-full max-w-[95%] mx-auto px-2 sm:px-4 pt-4 pb-6">
        {activeTab === 'shops' && (
          <CustomerHome 
            onSelectShop={handleSelectShop} 
            onOpenAuth={onOpenAuth}
          />
        )}

        {activeTab === 'digital-shop' && (
          <DigitalShopfront 
            shopId={selectedShopId} 
            onBack={() => setActiveTab('shops')} 
            onOpenCart={onOpenCart}
          />
        )}

        {activeTab === 'b2b' && (
          <WholesaleMarketplace onOpenCart={onOpenCart} />
        )}

        {activeTab === 'orders' && (
          <MyOrders onBrowseShops={() => setActiveTab('shops')} />
        )}
      </main>

      <ProductCompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
      />
    </div>
  );
}
