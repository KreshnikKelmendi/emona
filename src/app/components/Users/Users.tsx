"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface User {
  _id: string;
  fullName: string;
  phone: string;
  fileUpload: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D92127]"></div>
          <span className="ml-3 text-gray-600 font-bwseidoround-thin">Duke ngarkuar...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-bwseidoround-medium text-red-800 mb-2">Gabim në Ngarkim</h3>
          <p className="font-bwseidoround-thin text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-red-600 text-white font-bwseidoround-thin rounded-lg hover:bg-red-700 transition-colors"
          >
            Provo Përsëri
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bwseidoround-bold text-gray-900 mb-1">
              Baza e të Dhënave të Pjesëmarrësve
            </h1>
            <p className="font-bwseidoround-thin text-gray-600">
              Gjithsej: <span className="font-bwseidoround-medium text-[#D92127]">{users.length}</span> pjesëmarrës të regjistruar
            </p>
          </div>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-[#D92127] text-white font-bwseidoround-medium rounded-lg hover:bg-[#B71C1C] transition-colors text-sm flex items-center space-x-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Rifresko</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bwseidoround-bold text-gray-700 mb-2">
              Asnjë Pjesëmarrës Akoma
            </h3>
            <p className="font-bwseidoround-thin text-gray-500">
              Pjesëmarrësit do të shfaqen këtu kur të fillojnë të regjistrohen
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bwseidoround-bold text-gray-900 text-sm uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left font-bwseidoround-bold text-gray-900 text-sm uppercase tracking-wider">Emri</th>
                  <th className="px-6 py-4 text-left font-bwseidoround-bold text-gray-900 text-sm uppercase tracking-wider">Telefoni</th>
                  <th className="px-6 py-4 text-left font-bwseidoround-bold text-gray-900 text-sm uppercase tracking-wider">Skedari</th>
                  <th className="px-6 py-4 text-left font-bwseidoround-bold text-gray-900 text-sm uppercase tracking-wider">Data</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-bwseidoround-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#D92127] rounded-full flex items-center justify-center text-white font-bwseidoround-bold text-sm mr-4">
                          {(user.fullName || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bwseidoround-medium text-gray-900">
                            {user.fullName || 'Përdorues i Panjohur'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bwseidoround-thin text-gray-900">
                      +383 {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.fileUpload && user.fileUpload.startsWith('data:image/') ? (
                        <div className="flex items-center">
                          <Image 
                            src={user.fileUpload} 
                            alt={`Skedar për ${user.fullName || ''}`}
                            width={48}
                            height={48}
                            className="object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity mr-3"
                            onClick={() => {
                              const newWindow = window.open();
                              if (newWindow) {
                                newWindow.document.write(`
                                  <html>
                                    <head><title>Skedar - ${user.fullName || ''}</title></head>
                                    <body style="margin:0; padding:20px; background:#f5f5f5; display:flex; justify-content:center; align-items:center;">
                                      <img src="${user.fileUpload}" style="max-width:100%; max-height:100%; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);" />
                                    </body>
                                  </html>
                                `);
                              }
                            }}
                          />
                          <button 
                            className="text-sm font-bwseidoround-thin text-gray-600 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                            onClick={() => {
                              const newWindow = window.open();
                              if (newWindow) {
                                newWindow.document.write(`
                                  <html>
                                    <head><title>Skedar - ${user.fullName || ''}</title></head>
                                    <body style="margin:0; padding:20px; background:#f5f5f5; display:flex; justify-content:center; align-items:center;">
                                      <img src="${user.fileUpload}" style="max-width:100%; max-height:100%; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);" />
                                    </body>
                                  </html>
                                `);
                              }
                            }}
                          >
                            Shiko
                          </button>
                        </div>
                      ) : user.fileUpload ? (
                        <span className="text-sm font-bwseidoround-thin text-gray-600 bg-gray-100 px-3 py-1 rounded">
                          Skedar
                        </span>
                      ) : (
                        <span className="text-sm font-bwseidoround-thin text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bwseidoround-thin text-gray-900">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
