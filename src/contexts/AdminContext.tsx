
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminPassword: string;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const adminPassword = "admin123"; // In production, this should be more secure

  useEffect(() => {
    const savedAdminStatus = localStorage.getItem('shabam-admin');
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('shabam-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('shabam-admin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminPassword, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
