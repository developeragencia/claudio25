import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Página Não Encontrada
          </CardTitle>
          <CardDescription className="text-center">
            A página que você está procurando não existe
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-24 h-24 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            A página que você está tentando acessar pode ter sido movida ou excluída.
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

export default NotFound;
