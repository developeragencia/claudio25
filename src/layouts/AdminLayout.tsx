import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { UserRole } from '@/types/user';

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.ADMIN_MASTER) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return <Outlet />;
};

export default AdminLayout; 