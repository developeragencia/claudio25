import React from 'react';
import { useActiveClient } from '../contexts/ActiveClientContext';
import { ClientTimeline } from './ClientTimeline';

export const ClientDetails: React.FC = () => {
  const { client } = useActiveClient();

  if (!client) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Nenhum cliente selecionado</h3>
        <p className="mt-2 text-sm text-gray-500">
          Selecione um cliente na barra superior para visualizar seus detalhes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Detalhes do Cliente
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Informações detalhadas e histórico de atividades.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Razão Social</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {client.corporateName}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nome Fantasia</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {client.tradeName || '-'}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">CNPJ</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {client.cnpj}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  client.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {client.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-lg leading-6 font-medium text-gray-900">
          Histórico de Atividades
        </h4>
        <div className="mt-6">
          <ClientTimeline />
        </div>
      </div>
    </div>
  );
}; 