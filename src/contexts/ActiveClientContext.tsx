import React, { createContext, useContext, useState } from 'react';

export interface Client {
  id: string;
  cnpj: string;
  corporateName: string;
  tradeName: string;
  isActive: boolean;
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ActiveClientContextType {
  client: Client | null;
  setClient: (client: Client | null) => void;
}

const ActiveClientContext = createContext<ActiveClientContextType | undefined>(undefined);

export const useActiveClient = () => {
  const context = useContext(ActiveClientContext);
  if (context === undefined) {
    throw new Error('useActiveClient must be used within an ActiveClientProvider');
  }
  return context;
};

interface ActiveClientProviderProps {
  children: React.ReactNode;
}

export const ActiveClientProvider: React.FC<ActiveClientProviderProps> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);

  return (
    <ActiveClientContext.Provider value={{ client, setClient }}>
      {children}
    </ActiveClientContext.Provider>
  );
}; 