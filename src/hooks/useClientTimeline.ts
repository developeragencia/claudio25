import { useState, useCallback } from 'react';
import { useActiveClient } from '../contexts/ActiveClientContext';

export interface TimelineEvent {
  id: string;
  type: 'PROPOSAL' | 'CONTRACT' | 'IMPORT' | 'CALCULATION' | 'REPORT' | 'OTHER';
  title: string;
  description: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
  };
  metadata?: Record<string, any>;
}

export const useClientTimeline = () => {
  const { client } = useActiveClient();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEvent = useCallback(
    async (eventData: Omit<TimelineEvent, 'id' | 'createdAt'>) => {
      if (!client) {
        setError('Nenhum cliente ativo selecionado');
        return;
      }

      try {
        setIsLoading(true);
        // Aqui você implementaria a chamada à API para salvar o evento
        const newEvent: TimelineEvent = {
          ...eventData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };

        setEvents((prev) => [newEvent, ...prev]);
        setError(null);
      } catch (err) {
        setError('Erro ao adicionar evento ao histórico');
        console.error('Erro ao adicionar evento:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const loadEvents = useCallback(
    async (filters?: { type?: TimelineEvent['type']; startDate?: Date; endDate?: Date }) => {
      if (!client) {
        setError('Nenhum cliente ativo selecionado');
        return;
      }

      try {
        setIsLoading(true);
        // Aqui você implementaria a chamada à API para carregar os eventos
        // Por enquanto, vamos apenas simular um delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulação de dados
        const mockEvents: TimelineEvent[] = [];
        setEvents(mockEvents);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar histórico de eventos');
        console.error('Erro ao carregar eventos:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const clearEvents = useCallback(() => {
    setEvents([]);
    setError(null);
  }, []);

  return {
    events,
    isLoading,
    error,
    addEvent,
    loadEvents,
    clearEvents,
  };
}; 