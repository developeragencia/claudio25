import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Acesso Negado
          </CardTitle>
          <CardDescription className="text-center">
            Você não tem permissão para acessar esta página
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-24 h-24 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Se você acredita que isso é um erro, entre em contato com o administrador do sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            Voltar
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
          >
            Ir para Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 