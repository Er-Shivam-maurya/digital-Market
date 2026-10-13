import React from 'react';
import { Package, Store } from 'lucide-react';

export default function MyOrders({ onBrowseShops }) {
  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center space-x-2">
          <Package className="w-5 h-5 text-emerald-600" />
          <span>My Orders History</span>
        </h2>
        <p className="text-xs text-gray-500">Track current live order fulfillment and view past invoices.</p>
      </div>
    </div>
  );
}
