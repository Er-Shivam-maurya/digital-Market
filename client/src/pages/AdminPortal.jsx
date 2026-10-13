import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import { 
  ShieldAlert, 
  Users, 
  Store, 
  Package, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Activity, 
  BarChart3, 
  PieChart, 
  ShieldCheck,
  CreditCard,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export default function AdminPortal() {
  const { token } = useAuth();

  const [stats, setStats] = useState({ 
    totalUsers: 14, 
    totalShops: 5, 
    totalProducts: 16, 
    totalOrders: 8, 
    totalPlatformGMV: 48500,
    totalMonthlyRentMRR: 4496,
    activeSubscribedShopsCount: 4
  });
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [fraudRiskLogs, setFraudRiskLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('merchants');

  useEffect(() => {
    fetchAdminErpData();
  }, [token]);

  const fetchAdminErpData = async () => {
    setLoading(true);
    try {
      if (token) {
        const res = await fetch('/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data.stats || stats);
          setFraudRiskLogs(data.fraudRiskLogs || []);
          setShops(data.shops || []);
        }

        const userRes = await fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        if (userRes.ok) setUsers(userData.users || []);

        const compRes = await fetch('/api/admin/complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const compData = await compRes.json();
        if (compRes.ok) setComplaints(compData.complaints || []);
      }
    } catch (err) {
      console.error('Error loading admin portal:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShopStatus = async (shopId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/shops/${shopId}/verify-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        alert(`Shop verification status updated to ${newStatus}! Portal link unlocked for merchant.`);
        fetchAdminErpData();
      }
    } catch (err) {
      alert('Failed to update shop status');
    }
  };

  const handleGrantRentExtension = async (shopId) => {
    try {
      const res = await fetch(`/api/admin/shops/${shopId}/pay-rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Digital Storefront Rent Payout / Extension Recorded!');
        fetchAdminErpData();
      }
    } catch (err) {
      alert('Failed to record rent extension');
    }
  };

  return (
    <div className="space-y-6 pb-4 text-gray-900">
      
      {/* Deep Forest Green Admin Header */}
      <div className="bg-forest-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-forest-700">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-forest-800 text-amber-300 rounded-full text-xs font-extrabold border border-forest-700">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Master Admin Merchant Verification & Governance Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Platform Onboarding & Approval Command Desk
          </h1>
          <p className="text-xs text-forest-100/80">
            Approve pending merchant onboarding applications, monitor monthly shop rent MRR revenue, and resolve disputes.
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-gray-500">Pending Merchant Approvals</div>
          <div className="text-xl font-extrabold text-amber-600">
            {shops.filter(s => s.verifiedStatus === 'PENDING').length} Pending
          </div>
          <div className="text-[10px] text-amber-700 font-semibold">Requires Verification</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-gray-500">Total Verified Merchants</div>
          <div className="text-xl font-extrabold text-emerald-600">
            {shops.filter(s => s.verifiedStatus === 'VERIFIED').length} Verified
          </div>
          <div className="text-[10px] text-emerald-700 font-semibold">Active Digital Storefronts</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-gray-500">Monthly Rent MRR Revenue</div>
          <div className="text-xl font-extrabold text-forest-900">₹{(stats.totalMonthlyRentMRR || 4496).toLocaleString()} /mo</div>
          <div className="text-[10px] text-gray-500 font-semibold">Fixed Store Rent Collection</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-gray-500">Platform GMV Volume</div>
          <div className="text-xl font-extrabold text-coral-600">₹{stats.totalPlatformGMV.toLocaleString()}</div>
          <div className="text-[10px] text-coral-700 font-semibold">Retail & B2B Orders</div>
        </div>
      </div>

      {/* Admin ERP Navigation Sub-Bar */}
      <div className="bg-white p-2 rounded-2xl border border-cream-200 shadow-sm flex items-center space-x-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('merchants')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeAdminTab === 'merchants' ? 'bg-forest-900 text-white shadow-md' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <Store className="w-4 h-4 text-amber-300" />
          <span>🏬 Merchant Onboarding & Verification ({shops.filter(s => s.verifiedStatus === 'PENDING').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('subscriptions')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeAdminTab === 'subscriptions' ? 'bg-forest-900 text-white shadow-md' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-amber-300" />
          <span>💳 Store Rent Dues & Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
            activeAdminTab === 'analytics' ? 'bg-forest-900 text-white shadow-md' : 'text-gray-600 hover:bg-cream-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-300" />
          <span>MRR Growth Analytics</span>
        </button>
      </div>

      {/* Tab: Merchant Onboarding & Verification Approval Desk */}
      {activeAdminTab === 'merchants' && (
        <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Registered Merchant Verification & Approval Desk</h2>
              <p className="text-xs text-gray-500">Review pending onboarding applications. Approving a merchant unlocks their Shopkeeper Portal access link.</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full">
              {shops.filter(s => s.verifiedStatus === 'PENDING').length} Approvals Pending
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 text-gray-700 font-extrabold uppercase border-b border-gray-200">
                <tr>
                  <th className="p-3">Store & Owner Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">GSTIN Number</th>
                  <th className="p-3">Bank Account</th>
                  <th className="p-3">Verification Status</th>
                  <th className="p-3">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shops.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-extrabold text-gray-900">{s.name}</div>
                      <div className="text-[11px] text-gray-500">{s.owner?.name} ({s.owner?.email || s.phone})</div>
                    </td>
                    <td className="p-3 text-gray-600">{s.category}</td>
                    <td className="p-3 font-mono font-bold text-forest-800">{s.gstin || '07AAAAA1234A1Z5'}</td>
                    <td className="p-3 text-gray-600">{s.bankAccount || 'HDFC Bank - AC: 50100239482'}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 font-extrabold text-[11px] rounded-full uppercase ${
                        s.verifiedStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        s.verifiedStatus === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse'
                      }`}>
                        {s.verifiedStatus === 'VERIFIED' ? '✓ VERIFIED' : s.verifiedStatus === 'REJECTED' ? '✕ REJECTED' : '⏳ PENDING'}
                      </span>
                    </td>
                    <td className="p-3 space-x-1">
                      {s.verifiedStatus !== 'VERIFIED' && (
                        <button
                          onClick={() => handleUpdateShopStatus(s._id, 'VERIFIED')}
                          className="px-3 py-1 bg-forest-900 hover:bg-forest-800 text-white font-extrabold text-[11px] rounded shadow-xs transition-colors inline-flex items-center space-x-1 border border-forest-700"
                        >
                          <ThumbsUp className="w-3 h-3 text-amber-300" />
                          <span>Approve & Verify Store</span>
                        </button>
                      )}
                      
                      {s.verifiedStatus !== 'REJECTED' && (
                        <button
                          onClick={() => handleUpdateShopStatus(s._id, 'REJECTED')}
                          className="px-2.5 py-1 bg-cream-100 hover:bg-red-100 text-gray-700 hover:text-red-700 font-bold text-[11px] rounded transition-colors inline-flex items-center space-x-1"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          <span>Reject</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />

    </div>
  );
}
