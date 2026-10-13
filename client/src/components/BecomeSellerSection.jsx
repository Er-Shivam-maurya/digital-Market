import React, { useState } from 'react';
import { 
  Store, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Check, 
  Search, 
  FileText, 
  Copy, 
  Building2, 
  CreditCard, 
  TrendingUp, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ExternalLink,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function BecomeSellerSection() {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide', 'register', 'status'
  
  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    shopName: '',
    category: 'Grocery & Supermarket',
    address: '',
    gstin: '',
    bankAccount: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [regError, setRegError] = useState('');
  const [credentials, setCredentials] = useState(null);

  // Status Lookup State
  const [statusQuery, setStatusQuery] = useState('');
  const [statusResult, setStatusResult] = useState(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [statusError, setStatusError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegError('');
    setCredentials(null);

    try {
      const res = await fetch('/api/shops/register-merchant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setCredentials(data.credentials);
      setStatusQuery(regForm.email);
    } catch (err) {
      setRegError(err.message);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCheckStatus = async (e) => {
    e?.preventDefault();
    if (!statusQuery.trim()) return;

    setIsCheckingStatus(true);
    setStatusError('');
    setStatusResult(null);

    try {
      const res = await fetch(`/api/shops/status/check?query=${encodeURIComponent(statusQuery.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Status check failed');

      setStatusResult(data);
    } catch (err) {
      setStatusError(err.message);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Credentials copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden my-6 text-gray-900">
      
      {/* Header Banner - Forest Green */}
      <div className="bg-forest-900 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-forest-800/40 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-forest-800 border border-forest-700 backdrop-blur-md rounded-full text-xs font-extrabold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>OneShop Merchant Onboarding Hub</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Become a Seller & Launch Your Digital Shopfront
          </h2>

          <p className="text-xs sm:text-sm text-forest-100/90 leading-relaxed max-w-2xl">
            Zero order commissions, fixed monthly rent, 100% direct customer connections, and a complete ERP dashboard for managing your products, pricing, and flash sales.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-cream-100 border-b border-cream-200 p-2 flex items-center space-x-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-200'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>1. Step-by-Step Guide & Advantages</span>
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'register' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>2. Merchant Registration Form</span>
        </button>

        <button
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeTab === 'status' ? 'bg-forest-900 text-white shadow-xs' : 'text-gray-600 hover:bg-cream-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>3. Live Onboarding Status Tracker</span>
        </button>
      </div>

      {/* Content Tab 1: Step-by-Step Guide & Advantages */}
      {activeTab === 'guide' && (
        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center space-x-2">
              <Store className="w-5 h-5 text-forest-800" />
              <span>How to Become a Seller (4 Simple Steps)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-forest-50/60 rounded-2xl border border-forest-100 space-y-2 relative">
                <div className="w-7 h-7 rounded-xl bg-forest-900 text-white font-extrabold text-xs flex items-center justify-center">1</div>
                <h4 className="font-extrabold text-xs text-forest-950">Register Your Store</h4>
                <p className="text-[11px] text-gray-600 leading-snug">Fill your Shop Name, Owner Name, Contact Phone, Address, and GSTIN.</p>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2 relative">
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">2</div>
                <h4 className="font-extrabold text-xs text-amber-950">Admin Verification Audit</h4>
                <p className="text-[11px] text-gray-600 leading-snug">Master Admin verifies your GSTIN and store address credentials.</p>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2 relative">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">3</div>
                <h4 className="font-extrabold text-xs text-blue-950">Setup Digital Catalog & Media</h4>
                <p className="text-[11px] text-gray-600 leading-snug">Upload your store cover banner, logo badge, and product pricing list.</p>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2 relative">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">4</div>
                <h4 className="font-extrabold text-xs text-emerald-950">Go Live & Receive Orders</h4>
                <p className="text-[11px] text-gray-600 leading-snug">Accept hyper-local customer orders directly via your Shopkeeper Portal!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-gray-900 flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Key Advantages of OneShop Merchant Platform</span>
              </h4>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Zero Order Commission (0% Fee)</span>
                    <p className="text-[11px] text-gray-500">Keep 100% of your earnings. Pay only a fixed low monthly store rent.</p>
                  </div>
                </div>

                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">100% Direct Customer Hotline & WhatsApp Orders</span>
                    <p className="text-[11px] text-gray-500">Customers can call your shop or send order requests directly to your WhatsApp.</p>
                  </div>
                </div>

                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900">Dynamic Pricing & Net Profit Margin Matrix</span>
                    <p className="text-[11px] text-gray-500">Track cost price, selling price, GST tax, and net profit per item.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-gray-900 flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-forest-800" />
                <span>What Information is Needed to Register?</span>
              </h4>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 space-y-1">
                  <span className="font-bold text-gray-900">Required Documents / Info:</span>
                  <ul className="space-y-1 text-[11px] text-gray-600 list-disc list-inside">
                    <li>Shop Name & Owner Full Name</li>
                    <li>Active Phone Number & Email Address</li>
                    <li>Store Physical Address (Street/City)</li>
                    <li>GSTIN Number (optional, grants Verified badge)</li>
                    <li>Bank Account Number (for direct settlements)</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('register')}
                    className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Click Here to Fill Merchant Registration Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Content Tab 2: Registration Form */}
      {activeTab === 'register' && (
        <div className="p-6 sm:p-8 space-y-6">
          
          {credentials ? (
            <div className="bg-emerald-50 rounded-3xl p-6 border-2 border-emerald-300 shadow-md space-y-5 text-gray-900">
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 bg-emerald-200 text-emerald-900 text-[10px] font-extrabold rounded-full">
                    Registration Submitted
                  </span>
                  <h3 className="text-xl font-extrabold text-emerald-950 mt-0.5">
                    Welcome to OneShop, {credentials.shopName}!
                  </h3>
                </div>
              </div>

              <p className="text-xs text-emerald-800 leading-relaxed">
                Your store application has been created and submitted for <strong>Master Admin Verification</strong>. Below are your generated credentials:
              </p>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-3 text-xs relative shadow-xs">
                <div className="flex justify-between items-center font-bold text-gray-700 border-b border-gray-100 pb-2">
                  <span>Merchant Login Credentials:</span>
                  <button
                    onClick={() => copyToClipboard(`Email: ${credentials.email}\nPassword: ${credentials.password}`)}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-[11px] rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Credentials</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Merchant ID</span>
                    <div className="font-mono font-extrabold text-forest-800 text-xs">{credentials.merchantId}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Login Email</span>
                    <div className="font-bold text-gray-900 text-xs">{credentials.email}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Password</span>
                    <div className="font-mono font-bold text-gray-900 text-xs">{credentials.password}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('status');
                    handleCheckStatus();
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Check Verification Status Live</span>
                </button>

                <a
                  href="http://localhost:3000/seller"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Go to Shopkeeper Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Merchant & Shop Registration Form</h3>
                <p className="text-xs text-gray-500">Fill your store details below to generate your merchant account credentials.</p>
              </div>

              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                  {regError}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Shopkeeper Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Digital Shop Name *</label>
                    <input
                      type="text"
                      required
                      value={regForm.shopName}
                      onChange={e => setRegForm({ ...regForm, shopName: e.target.value })}
                      placeholder="e.g. Sharma Kirana & General Store"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Merchant Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="merchant@oneshop.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={regForm.password}
                      onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Store Category *</label>
                    <select
                      value={regForm.category}
                      onChange={e => setRegForm({ ...regForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold"
                    >
                      <option value="Grocery & Supermarket">Grocery & Supermarket</option>
                      <option value="Restaurant & Food">Restaurant & Food</option>
                      <option value="Electronics & Mobiles">Electronics & Mobiles</option>
                      <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                      <option value="Pharmacy & Health">Pharmacy & Health</option>
                      <option value="General Store">General Store</option>
                      <option value="Wholesale & Farming">Wholesale & Farming</option>
                      <option value="Dairy & Sweets">Dairy & Sweets</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Store Physical Address *</label>
                    <input
                      type="text"
                      required
                      value={regForm.address}
                      onChange={e => setRegForm({ ...regForm, address: e.target.value })}
                      placeholder="Shop #4, Main Market, Connaught Place, New Delhi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isRegistering}
                  className="px-6 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{isRegistering ? 'Registering Shop...' : 'Submit Shop Registration & Get Credentials'}</span>
                </button>

              </form>
            </div>
          )}

        </div>
      )}

      {/* Content Tab 3: Onboarding Status Panel */}
      {activeTab === 'status' && (
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h3 className="text-base font-extrabold text-gray-900">Merchant Onboarding Verification Status Lookup</h3>
            <p className="text-xs text-gray-500">Enter your registered Email, Phone, or Shop Name to check your Master Admin approval status.</p>
          </div>

          <form onSubmit={handleCheckStatus} className="flex gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={statusQuery}
                onChange={e => setStatusQuery(e.target.value)}
                placeholder="Enter Email or Phone number..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-xs"
              />
            </div>
            
            <button
              type="submit"
              disabled={isCheckingStatus}
              className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-xs"
            >
              {isCheckingStatus ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {statusResult && (
            <div className="bg-cream-50 p-6 rounded-3xl border border-cream-200 space-y-4 max-w-2xl text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">{statusResult.shopName}</h4>
                  <span className="text-[11px] text-gray-500">Registered Email: {statusResult.ownerEmail}</span>
                </div>

                <span className={`px-3 py-1 font-extrabold text-xs rounded-full uppercase flex items-center space-x-1 ${
                  statusResult.verifiedStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  statusResult.verifiedStatus === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                  'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {statusResult.verifiedStatus === 'VERIFIED' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> :
                   statusResult.verifiedStatus === 'REJECTED' ? <AlertCircle className="w-3.5 h-3.5 text-red-600" /> :
                   <Clock className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{statusResult.verifiedStatus}</span>
                </span>
              </div>

              {statusResult.verifiedStatus === 'VERIFIED' && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="font-bold text-emerald-950 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Store Approved & Verified by Master Admin!</span>
                  </div>
                  <a
                    href="http://localhost:3000/seller"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                  >
                    <span>🚀 Access Your Shopkeeper Portal Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
