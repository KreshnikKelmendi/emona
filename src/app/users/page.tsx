"use client";

import { useState } from "react";
import Link from "next/link";
import Users from '../components/Users/Users';
import PrizeRoulette from '../components/PrizeRoulette/PrizeRoulette';
import WinnersList from '../components/WinnersList/WinnersList';

export default function UsersPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRoulette, setShowRoulette] = useState(false);
  const [showWinnersList, setShowWinnersList] = useState(false);

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
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRoulette(true)}
                className="px-4 py-2 bg-[#FFD700] text-[#280F03] font-anton rounded-lg hover:bg-[#FFC700] transition-colors text-sm flex items-center space-x-2 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Shpall Fituesit</span>
              </button>
              <button
                onClick={() => setShowWinnersList(true)}
                className="px-4 py-2 bg-[#D92127] text-white font-anton rounded-lg hover:bg-[#B71C1C] transition-colors text-sm flex items-center space-x-2 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Lista e Fituesve</span>
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-[#D92127] text-white font-bwseidoround-thin rounded-lg hover:bg-[#B71C1C] transition-colors text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Faqja Kryesore</span>
              </Link>
              <button
                onClick={() => setIsAuthorized(false)}
                className="px-4 py-2 bg-gray-500 text-white font-bwseidoround-thin rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Dil
              </button>
            </div>
          </div>
          <Users />
        </div>
      </div>
      <PrizeRoulette isOpen={showRoulette} onClose={() => setShowRoulette(false)} />
      <WinnersList isOpen={showWinnersList} onClose={() => setShowWinnersList(false)} />
    </div>
  );
}
