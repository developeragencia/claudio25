import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const UnderDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Em Desenvolvimento
          </CardTitle>
          <CardDescription className="text-center">
            Esta funcionalidade está atualmente em desenvolvimento
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-24 h-24 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Estamos trabalhando duro para trazer esta funcionalidade para você em breve.
            Por favor, volte mais tarde.
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

export default UnderDevelopment; 