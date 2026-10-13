import React from 'react';
import { Tractor, Sparkles, Building2 } from 'lucide-react';

export default function WholesaleMarketplace() {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold text-amber-100 mb-2">
          <Tractor className="w-3.5 h-3.5 text-amber-200" />
          <span>Farm-Direct & Wholesale B2B Depot</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Wholesale & Farm Produce Marketplace</h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-xl mt-1">
          Source grain bags, bulk spices, and fresh farm produce directly from verified farmers & grain mandi depots.
        </p>
      </div>
    </div>
  );
}
