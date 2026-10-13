import React, { useState } from 'react';
import MerchantDashboard from '../pages/MerchantDashboard';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import { Building2, LogOut, Store, ArrowRight, Mail, Lock, User, Phone, Sparkles } from 'lucide-react';

export default function SellerERPApp({ onOpenAuth }) {
  const { user, logout, login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSellerLoggedIn = user && (user.role === 'SELLER' || user.role === 'SHOPKEEPER' || user.role === 'ADMIN');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUp ? { name, email, password, role: 'SELLER', phone, shopName } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-gray-900 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-white border-b border-cream-200 shadow-xs">
        <div className="w-full max-w-[95%] mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-900 flex items-center justify-center text-white shadow-md border border-forest-800">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-forest-900">OneShop Merchant</span>
              <span className="ml-2 px-2.5 py-0.5 text-[9px] font-extrabold bg-forest-50 text-forest-900 rounded-full uppercase border border-forest-100">Shopkeeper Portal</span>
            </div>
          </div>

          <div>
            {user ? (
              <button onClick={logout} className="p-1.5 text-gray-500 hover:text-coral-600" title="Logout"><LogOut className="w-4 h-4" /></button>
            ) : (
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white text-xs font-extrabold rounded-xl shadow-xs">Log In</button>
            )}
          </div>
        </div>
      </header>

      {isSellerLoggedIn ? (
        <main className="flex-1 w-full max-w-[95%] mx-auto px-4 pt-4 pb-6">
          <MerchantDashboard />
        </main>
      ) : (
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-900">Grow Your Local Shop Online with OneShop</h1>
            <p className="text-xs text-gray-600 leading-relaxed">Transform your traditional shop into a digital storefront with zero order commissions and fixed monthly rent.</p>
          </div>

          <div className="w-full max-w-md bg-white rounded-3xl border border-cream-200 shadow-2xl p-6 space-y-4">
            <h2 className="text-xl font-extrabold text-gray-900">{isSignUp ? 'Register Your Shop' : 'Sign In to Shopkeeper Portal'}</h2>
            {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md">
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
