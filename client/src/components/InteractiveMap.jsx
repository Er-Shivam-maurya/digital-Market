import React from 'react';

export default function InteractiveMap({ userLocation, shops, onSelectShop }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 text-center space-y-4">
      <div className="relative h-64 w-full bg-slate-100 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
            📍
          </div>
          <h4 className="font-extrabold text-sm text-gray-800">Map View Centered at {userLocation.name}</h4>
          <p className="text-xs text-gray-500">{shops.length} Nearby Shops Plotted on Interactive GPS Map</p>
        </div>
      </div>
    </div>
  );
}
