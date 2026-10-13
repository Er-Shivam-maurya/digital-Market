import React from 'react';
import { MapPin, Star, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export default function ShopCard({ shop, onSelectShop }) {
  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
        <img 
          src={shop.image || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80'} 
          alt={shop.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"></div>

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-forest-900 shadow-sm uppercase tracking-wider">
          {shop.category}
        </div>

        <div className="absolute top-3 right-3 bg-forest-900 text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 shadow-sm border border-forest-700">
          <CheckCircle2 className="w-3 h-3 text-amber-400" />
          <span>Verified Shop</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-white shadow-md overflow-hidden shrink-0 flex items-center justify-center">
            {shop.logoImage ? (
              <img src={shop.logoImage} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-5 h-5 text-forest-900" />
            )}
          </div>
          <div className="text-white truncate">
            <h3 className="font-extrabold text-sm truncate leading-tight text-white">{shop.name}</h3>
            <p className="text-[11px] text-cream-100/80 truncate">{shop.address}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
        <p className="text-gray-600 text-[11px] line-clamp-2 leading-relaxed">
          {shop.description || 'Neighborhood store supplying fresh groceries, daily staples, and essentials.'}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
          <div className="flex items-center space-x-1 font-extrabold text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{shop.rating || 4.8}</span>
            <span className="text-gray-400 font-normal">(120+ ratings)</span>
          </div>

          <div className="font-bold text-gray-700 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-forest-800" />
            <span>{shop.distanceKm || 1.2} km away</span>
          </div>
        </div>

        <button
          onClick={() => onSelectShop(shop)}
          className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>Visit Digital Storefront</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
