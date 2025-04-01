import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Email ou senha inválidos. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-white bg-geometric">
      <div className="grid-pattern"></div>
      
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <Logo animated size="lg" className="mx-auto" />
          <p className="text-gray-600 mt-4 animate-fade-in animate-delay-2">
            Sistema para Recuperação de Créditos Tributários
          </p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/95 animate-fade-in animate-delay-1 shadow-xl border-gray-200">
          <CardHeader>
            <CardTitle className="text-center">Acesse sua conta</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-[1.02]" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center animate-fade-in animate-delay-3">
          <p className="text-sm text-gray-600">
            Para acesso de teste, use:
          </p>
          <p className="text-xs mt-2 text-gray-600">Admin: admin@sistemaclaudiofigueiredo.com</p>
          <p className="text-xs text-gray-600">Senha: admin123</p>
        </div>
        
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>
            Desenvolvido por <a href="https://alexdesenvolvedor.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Alex Developer</a>
          </p>
          <p className="mt-1">© 2025 Sistemas Cláudio Figueiredo. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
