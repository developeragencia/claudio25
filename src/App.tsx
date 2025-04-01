import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import LoadingSpinner from "./components/ui/loading-spinner";
import ErrorBoundary from "./components/ui/error-boundary";
import { ActiveClientProvider } from './contexts/ActiveClientContext';
import { ActiveClientBar } from './components/ActiveClientBar';
import { AccessDenied } from './pages/AccessDenied';
import { ClientDetails } from './components/ClientDetails';
import { UserRole } from './types/user';
import PublicRoute from "./components/PublicRoute";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import AdminLayout from "./layouts/AdminLayout";

// Lazy loaded components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Clients = lazy(() => import("./pages/Clients"));
const Proposals = lazy(() => import("./pages/Proposals"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CNPJIntegration = lazy(() => import("./pages/CNPJ/Integration"));
const AuditPage = lazy(() => import("./pages/Audit/AuditPage"));
const TaxRatesPage = lazy(() => import("./pages/TaxRates/TaxRatesPage"));
const UnderDevelopment = lazy(() => import('./pages/UnderDevelopment'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    const { user } = useAuth();
    
    if (user?.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRoute>
      <AppLayout>{children}</AppLayout>
    </AdminRoute>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

// Mock de clientes disponíveis para demonstração
const mockClients = [
  {
    id: '1',
    cnpj: '12.345.678/0001-90',
    corporateName: 'Empresa ABC Ltda',
    tradeName: 'ABC Serviços',
    isActive: true,
    assignedUsers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    cnpj: '98.765.432/0001-10',
    corporateName: 'XYZ Consultoria S.A.',
    tradeName: 'XYZ Group',
    isActive: true,
    assignedUsers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock do usuário atual para demonstração
const currentUser = {
  role: UserRole.ADMIN_MASTER,
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ActiveClientProvider>
                <div className="min-h-screen bg-gray-50">
                  <ActiveClientBar availableClients={mockClients} />
                  <div className="container mx-auto px-4 py-8">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        {/* Rotas Públicas */}
                        <Route element={<PublicRoute />}>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/index" element={<Navigate to="/" replace />} />
                          <Route path="/login" element={<Login />} />
                        </Route>

                        {/* Rotas Autenticadas */}
                        <Route element={<AuthenticatedLayout />}>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/clients" element={<Clients />} />
                          <Route path="/proposals" element={<Proposals />} />
                          <Route path="/audit" element={<AuditPage />} />
                          
                          <Route path="/client-management" element={<UnderDevelopment />} />
                          <Route path="/commercial-proposals" element={<UnderDevelopment />} />
                          <Route path="/tax-credits" element={<UnderDevelopment />} />
                          <Route path="/advanced-calculator" element={<UnderDevelopment />} />
                          <Route path="/irrf-calculations" element={<UnderDevelopment />} />
                          <Route path="/irrf-recovery" element={<UnderDevelopment />} />
                          <Route path="/credit-identification" element={<UnderDevelopment />} />
                          <Route path="/data-import" element={<UnderDevelopment />} />
                          <Route path="/detailed-reports" element={<UnderDevelopment />} />
                          <Route path="/tax-compensation" element={<UnderDevelopment />} />
                          <Route path="/interactive-dashboard" element={<UnderDevelopment />} />
                          <Route path="/retention-receipts" element={<UnderDevelopment />} />
                          <Route path="/fiscal-reports" element={<UnderDevelopment />} />
                          <Route path="/monetary-correction" element={<UnderDevelopment />} />
                          <Route path="/audit-management" element={<UnderDevelopment />} />
                          <Route path="/tax-dossiers" element={<UnderDevelopment />} />
                          
                          <Route path="/users" element={<UnderDevelopment />} />
                          <Route path="/security" element={<UnderDevelopment />} />
                          <Route path="/access-control" element={<UnderDevelopment />} />
                          <Route path="/two-factor" element={<UnderDevelopment />} />
                          <Route path="/alerts" element={<UnderDevelopment />} />
                          <Route path="/logs" element={<UnderDevelopment />} />
                        </Route>

                        {/* Rotas Admin */}
                        <Route element={<AdminLayout />}>
                          <Route path="/admin-dashboard" element={<UnderDevelopment />} />
                          <Route path="/settings" element={<UnderDevelopment />} />
                          <Route path="/backup" element={<UnderDevelopment />} />
                          <Route path="/workflows" element={<UnderDevelopment />} />
                          <Route path="/integrations" element={<UnderDevelopment />} />
                          <Route path="/cnpj-integration" element={<CNPJIntegration />} />
                          <Route path="/tax-rates" element={<TaxRatesPage />} />
                          
                          <Route path="/website" element={<UnderDevelopment />} />
                          <Route path="/content" element={<UnderDevelopment />} />
                          <Route path="/knowledge-base" element={<UnderDevelopment />} />
                          
                          <Route path="/support-tickets" element={<UnderDevelopment />} />
                          <Route path="/help" element={<UnderDevelopment />} />
                          <Route path="/contact" element={<UnderDevelopment />} />
                        </Route>

                        {/* Outras Rotas */}
                        <Route path="/acesso-negado" element={<AccessDenied />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                </div>
              </ActiveClientProvider>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
