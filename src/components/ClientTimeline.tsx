import React, { useEffect } from 'react';
import { useClientTimeline, TimelineEvent } from '../hooks/useClientTimeline';

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'PROPOSAL':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'CONTRACT':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'IMPORT':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'PROPOSAL':
      return 'text-blue-500';
    case 'CONTRACT':
      return 'text-green-500';
    case 'IMPORT':
      return 'text-purple-500';
    case 'CALCULATION':
      return 'text-yellow-500';
    case 'REPORT':
      return 'text-indigo-500';
    default:
      return 'text-gray-500';
  }
};

interface ClientTimelineProps {
  filters?: {
    type?: TimelineEvent['type'];
    startDate?: Date;
    endDate?: Date;
  };
}

export const ClientTimeline: React.FC<ClientTimelineProps> = ({ filters }) => {
  const { events, isLoading, error, loadEvents } = useClientTimeline();

  useEffect(() => {
    loadEvents(filters);
  }, [loadEvents, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum evento encontrado no histórico.
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white ${getEventColor(
                      event.type
                    )}`}
                  >
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.title}{' '}
                      <span className="font-medium text-gray-900">
                        por {event.createdBy.name}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.createdAt.toISOString()}>
                      {new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      }).format(event.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 