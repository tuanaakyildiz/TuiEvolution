// GEREKLİ İMPORT: useState ve useContext'i React'ten çekiyoruz
import React, { createContext, useState, useContext, useEffect } from 'react';

// Context'i oluşturuyoruz
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // useState artık tanımlı olduğu için hata vermeyecek
  const [user, setUser] = useState(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcıyı kontrol et
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook: Diğer dosyalarda kolayca kullanmak için
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};