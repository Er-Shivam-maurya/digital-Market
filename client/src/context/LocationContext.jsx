import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState({
    name: 'Connaught Place, New Delhi',
    lat: 28.6315,
    lng: 77.2195
  });
  const [radiusKm, setRadiusKm] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <LocationContext.Provider value={{
      userLocation,
      setUserLocation,
      radiusKm,
      setRadiusKm,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      isLocationModalOpen,
      setIsLocationModalOpen
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
