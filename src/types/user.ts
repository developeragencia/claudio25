export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  ADMIN_MASTER = 'ADMIN_MASTER',
  SUPPORT = 'SUPPORT',
  AUDITOR = 'AUDITOR',
  MANAGER = 'MANAGER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  cnpj: string;
  corporateName: string;
  tradeName?: string;
  isActive: boolean;
  assignedUsers: string[]; // IDs dos usuários designados
  salesRepId?: string; // ID do representante comercial
  createdAt: Date;
  updatedAt: Date;
}

export interface ActiveClientContext {
  client: Client | null;
  setActiveClient: (client: Client | null) => void;
}

export interface UserPermissions {
  canViewClients: boolean;
  canEditClients: boolean;
  canDeleteClients: boolean;
  canViewProposals: boolean;
  canCreateProposals: boolean;
  canEditProposals: boolean;
  canDeleteProposals: boolean;
  canViewReports: boolean;
  canExportReports: boolean;
  canViewAuditLogs: boolean;
  canManageUsers: boolean;
  canManageRoles: boolean;
  canAccessAdminPanel: boolean;
  canConfigureSystem: boolean;
  canViewAnalytics: boolean;
  canManageIntegrations: boolean;
} 