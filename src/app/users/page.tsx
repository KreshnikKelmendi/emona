"use client";

import { useState } from "react";
import Users from '../components/Users/Users';

export default function UsersPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - you can change this password
    if (password === "emona2024") {
      setIsAuthorized(true);
      setError("");
    } else {
      setError("Fjalëkalimi është i gabuar. Ju lutem provoni përsëri.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bwseidoround-medium text-[#1D1C1C] mb-2">
              Hyrje në Panel
            </h1>
            <p className="font-bwseidoround-thin text-[#1D1C1C] text-sm">
              Vendosni fjalëkalimin për të parë pjesëmarrësit
            </p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Fjalëkalimi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D92127] focus:border-[#D92127] font-bwseidoround-thin text-[#1D1C1C]"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm font-bwseidoround-thin text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#D92127] text-white font-bwseidoround-thin rounded-lg hover:bg-black transition-colors"
            >
              Hyr
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with logout */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bwseidoround-medium text-[#1D1C1C]">
                EMONA - Lojë Shpërblyese
              </h1>
              <p className="font-bwseidoround-thin text-[#1D1C1C] text-sm">
                Sistemi i Menaxhimit të Pjesëmarrësve
              </p>
            </div>
            <button
              onClick={() => setIsAuthorized(false)}
              className="px-4 py-2 bg-gray-500 text-white font-bwseidoround-thin rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Dil
            </button>
          </div>
          <Users />
        </div>
      </div>
    </div>
  );
}
