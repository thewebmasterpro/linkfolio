import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}