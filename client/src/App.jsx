import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation as useRouterLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import CustomerApp from './apps/CustomerApp';
import SellerERPApp from './apps/SellerERPApp';
import AdminERPApp from './apps/AdminERPApp';
import AuthModal from './components/AuthModal';

function MainRoutes() {
  const routerLoc = useRouterLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getPortalRole = () => {
    if (routerLoc.pathname.startsWith('/seller')) return 'SELLER';
    if (routerLoc.pathname.startsWith('/admin')) return 'ADMIN';
    return 'CUSTOMER';
  };

  return (
    <>
      <Routes>
        <Route path="/seller/*" element={<SellerERPApp onOpenAuth={() => setIsAuthModalOpen(true)} />} />
        <Route path="/admin/*" element={<AdminERPApp onOpenAuth={() => setIsAuthModalOpen(true)} />} />
        <Route path="/*" element={<CustomerApp onOpenAuth={() => setIsAuthModalOpen(true)} onOpenCart={() => {}} />} />
      </Routes>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        portalRole={getPortalRole()}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </LocationProvider>
    </AuthProvider>
  );
}
