import { useMemo } from 'react';
import { UserRole, UserPermissions } from '@/types/user';

export const useUserPermissions = (role: UserRole): UserPermissions => {
  return useMemo(() => {
    const basePermissions: UserPermissions = {
      canViewClients: false,
      canEditClients: false,
      canDeleteClients: false,
      canViewProposals: false,
      canCreateProposals: false,
      canEditProposals: false,
      canDeleteProposals: false,
      canViewReports: false,
      canExportReports: false,
      canViewAuditLogs: false,
      canManageUsers: false,
      canManageRoles: false,
      canAccessAdminPanel: false,
      canConfigureSystem: false,
      canViewAnalytics: false,
      canManageIntegrations: false,
    };

    switch (role) {
      case UserRole.ADMIN_MASTER:
        return {
          ...basePermissions,
          canViewClients: true,
          canEditClients: true,
          canDeleteClients: true,
          canViewProposals: true,
          canCreateProposals: true,
          canEditProposals: true,
          canDeleteProposals: true,
          canViewReports: true,
          canExportReports: true,
          canViewAuditLogs: true,
          canManageUsers: true,
          canManageRoles: true,
          canAccessAdminPanel: true,
          canConfigureSystem: true,
          canViewAnalytics: true,
          canManageIntegrations: true,
        };

      case UserRole.ADMIN:
        return {
          ...basePermissions,
          canViewClients: true,
          canEditClients: true,
          canViewProposals: true,
          canCreateProposals: true,
          canEditProposals: true,
          canViewReports: true,
          canExportReports: true,
          canViewAuditLogs: true,
          canManageUsers: true,
          canViewAnalytics: true,
          canManageIntegrations: true,
        };

      case UserRole.MANAGER:
        return {
          ...basePermissions,
          canViewClients: true,
          canEditClients: true,
          canViewProposals: true,
          canCreateProposals: true,
          canEditProposals: true,
          canViewReports: true,
          canExportReports: true,
          canViewAnalytics: true,
        };

      case UserRole.AUDITOR:
        return {
          ...basePermissions,
          canViewClients: true,
          canViewProposals: true,
          canViewReports: true,
          canExportReports: true,
          canViewAuditLogs: true,
          canViewAnalytics: true,
        };

      case UserRole.SUPPORT:
        return {
          ...basePermissions,
          canViewClients: true,
          canViewProposals: true,
          canViewReports: true,
        };

      case UserRole.CLIENT:
        return {
          ...basePermissions,
          canViewProposals: true,
          canViewReports: true,
        };

      default:
        return basePermissions;
    }
  }, [role]);
};

export default useUserPermissions; 