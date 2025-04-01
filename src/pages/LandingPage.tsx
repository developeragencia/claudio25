import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sistema de Controle de Clientes e Usuários
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gerencie seus clientes, propostas comerciais e processos de forma eficiente e segura.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
            >
              Acessar Sistema
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Principais Funcionalidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Gestão de Clientes"
              description="Cadastre e gerencie seus clientes de forma organizada, com histórico completo de interações."
              icon={
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Propostas Comerciais"
              description="Crie e acompanhe propostas comerciais, com fluxo de aprovação e histórico de alterações."
              icon={
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <FeatureCard
              title="Controle de Acesso"
              description="Defina permissões e papéis para seus usuários, garantindo a segurança das informações."
              icon={
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comece a usar agora mesmo
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Simplifique a gestão dos seus clientes e processos com nossa plataforma completa.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/login')}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
