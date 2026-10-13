import React from 'react';
import { X } from 'lucide-react';

export default function ProductCompareModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4"><X className="w-5 h-5" /></button>
        <h3 className="font-extrabold text-base mb-2">Compare Prices Across Local Shops</h3>
      </div>
    </div>
  );
}
