
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: UserRole; // Role is now optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You can add a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (role && user.role !== role) {
    // Logged in, but does not have the required role, redirect to home
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;
