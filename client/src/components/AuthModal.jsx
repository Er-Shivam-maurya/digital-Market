import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  User, 
  Store, 
  ShieldAlert, 
  ArrowRight, 
  Mail, 
  Lock, 
  Phone 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, portalRole = 'CUSTOMER' }) {
  if (!isOpen) return null;

  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const targetRole = portalRole === 'SELLER' ? 'SELLER' : portalRole === 'ADMIN' ? 'ADMIN' : 'CUSTOMER';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUp 
      ? { name, email, password, role: targetRole, phone }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      
      login(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const headerGradient = 
    portalRole === 'SELLER' ? 'from-indigo-600 via-indigo-700 to-blue-800' :
    portalRole === 'ADMIN' ? 'from-rose-600 via-rose-700 to-amber-600' :
    'from-brand-600 via-blue-600 to-indigo-600';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200 text-gray-900">
        
        {/* Dynamic Branded Header */}
        <div className={`px-6 pt-6 pb-5 text-white relative bg-gradient-to-r ${headerGradient}`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20">
              {portalRole === 'SELLER' ? <Store className="w-5 h-5 text-white" /> :
               portalRole === 'ADMIN' ? <ShieldAlert className="w-5 h-5 text-white" /> :
               <User className="w-5 h-5 text-white" />}
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                {portalRole === 'SELLER' ? 'Merchant Portal' : portalRole === 'ADMIN' ? 'Admin Portal' : 'Customer Portal'}
              </span>
              <h2 className="text-xl font-extrabold tracking-tight mt-0.5">
                {portalRole === 'SELLER' ? 'Shopkeeper Sign In' :
                 portalRole === 'ADMIN' ? 'Master Admin Console' :
                 'Customer Account Sign In'}
              </h2>
            </div>
          </div>
        </div>

        {/* Input Form Body */}
        <div className="p-6 space-y-4">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
              {isSignUp ? 'Create New Account' : 'Sign In With Email'}
            </span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isSignUp && (
              <>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : (isSignUp ? 'Create Account & Sign In' : `Sign In`)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-gray-100">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-extrabold text-gray-600 hover:text-brand-600 transition-colors"
            >
              {isSignUp ? 'Already registered? Sign In' : "Don't have an account? Create One"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
