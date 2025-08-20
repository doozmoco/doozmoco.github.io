import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
  register: (username: string, password: string) => Promise<User>;
  googleLogin: () => Promise<User>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSuccessfulLogin = (loggedInUser: User) => {
    localStorage.setItem('auth_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    if (loggedInUser.role === 'ADMIN') {
        navigate('/admin');
    } else {
        navigate('/');
    }
  };

  const login = async (username: string, password: string): Promise<User> => {
    const loggedInUser = await api.loginUser(username, password);
    if (loggedInUser) {
      handleSuccessfulLogin(loggedInUser);
      return loggedInUser;
    }
    throw new Error("Invalid username or password");
  };

  const register = async (username: string, password: string): Promise<User> => {
    const newUser = await api.registerUser(username, password);
    handleSuccessfulLogin(newUser);
    return newUser;
  };
  
  const googleLogin = async (): Promise<User> => {
    const googleUser = await api.findOrCreateGoogleUser();
    handleSuccessfulLogin(googleUser);
    return googleUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};