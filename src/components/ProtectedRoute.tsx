import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { UserRole } from '../types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions: Array<keyof ReturnType<typeof useUserPermissions>>;
  userRole: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions,
  userRole,
}) => {
  const permissions = useUserPermissions(userRole);

  const hasRequiredPermissions = requiredPermissions.every(
    (permission) => permissions[permission]
  );

  if (!hasRequiredPermissions) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return <>{children}</>;
}; 