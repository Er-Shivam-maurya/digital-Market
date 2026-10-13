import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('oneshop_token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oneshop_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState([]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('oneshop_token', newToken);
    localStorage.setItem('oneshop_user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setCart([]);
    localStorage.removeItem('oneshop_token');
    localStorage.removeItem('oneshop_user');
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
