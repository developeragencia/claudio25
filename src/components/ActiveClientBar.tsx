import React from 'react';
import { useActiveClient } from '@/contexts/ActiveClientContext';
import { Client } from '@/contexts/ActiveClientContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ActiveClientBarProps {
  availableClients: Client[];
}

export const ActiveClientBar: React.FC<ActiveClientBarProps> = ({ availableClients }) => {
  const { client, setClient } = useActiveClient();

  const handleClientChange = (clientId: string) => {
    const selectedClient = availableClients.find(c => c.id === clientId);
    setClient(selectedClient || null);
  };

  const handleClearClient = () => {
    setClient(null);
  };

  return (
    <div className="bg-white border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Cliente Ativo:</span>
          <Select
            value={client?.id || ''}
            onValueChange={handleClientChange}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {availableClients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.corporateName} ({c.cnpj})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {client && (
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-medium text-gray-900">{client.corporateName}</p>
              <p className="text-gray-500">{client.cnpj}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearClient}
            >
              Limpar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 