import React from 'react';
import { Store, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white mt-16 pt-12 pb-8 border-t border-forest-800">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-forest-800 text-xs">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-coral-500 flex items-center justify-center text-white font-bold shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">OneShop</span>
            </div>
            <p className="text-forest-100/80 leading-relaxed text-[11px]">
              Empowering local kirana stores, supermarkets, farmers & retail shops with digital storefronts, zero order commissions, and hyper-local discovery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-1.5 text-forest-100/90 text-[11px]">
              <li><a href="/customer" className="hover:text-coral-500 transition-colors">Nearby Local Shops</a></li>
              <li><a href="/customer" className="hover:text-coral-500 transition-colors">Wholesale B2B Depot</a></li>
              <li><a href="/customer" className="hover:text-coral-500 transition-colors">Digital Storefronts</a></li>
              <li><a href="/customer" className="hover:text-coral-500 transition-colors">Compare Local Prices</a></li>
            </ul>
          </div>

          {/* For Merchants */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">For Shopkeepers</h4>
            <ul className="space-y-1.5 text-forest-100/90 text-[11px]">
              <li><a href="/seller" className="hover:text-coral-500 transition-colors">Become a Seller</a></li>
              <li><a href="/seller" className="hover:text-coral-500 transition-colors">Shopkeeper ERP Dashboard</a></li>
              <li><a href="/seller" className="hover:text-coral-500 transition-colors">Monthly Rent Subscription</a></li>
              <li><a href="/seller" className="hover:text-coral-500 transition-colors">GSTIN & Bank Settlements</a></li>
            </ul>
          </div>

          {/* Governance */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider">Enterprise</h4>
            <ul className="space-y-1.5 text-forest-100/90 text-[11px]">
              <li><a href="/admin" className="hover:text-coral-500 transition-colors">Master Admin Portal</a></li>
              <li><a href="/admin" className="hover:text-coral-500 transition-colors">Platform MRR Analytics</a></li>
              <li><a href="/admin" className="hover:text-coral-500 transition-colors">Seller Verification Desk</a></li>
              <li><a href="/admin" className="hover:text-coral-500 transition-colors">AI Anomaly Risk Logs</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-forest-100/70 font-medium">
          <div>
            © 2026 OneShop Inc. All rights reserved. Empowering Local Commerce.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-coral-500 fill-coral-500" />
            <span>for Local Merchants</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
