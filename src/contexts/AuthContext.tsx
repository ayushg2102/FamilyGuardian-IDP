import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
    // Admin login
    if (email === 'admin' && password === 'admin') {
      const adminData = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@familyguardian.com',
        department: 'Administration',
        role: 'admin',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      };

      setUser(adminData);
      setIsAuthenticated(true);

      if (remember) {
        localStorage.setItem('user', JSON.stringify(adminData));
      }
      return true;
    }
    
    // Initiator login
    if (email === 'james' && password === 'password') {
      const initiatorData = {
        id: 'user-1',
        name: 'James Blunt',
        email: 'james@familyguardian.com',
        department: 'Operations',
        role: 'initiator',
        avatar:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      };

      setUser(initiatorData);
      setIsAuthenticated(true);

      if (remember) {
        localStorage.setItem('user', JSON.stringify(initiatorData));
      }
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
