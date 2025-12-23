"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { jsPDF } from 'jspdf';

interface Winner {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  prizeId: number;
  prizeName: string;
  prizeImage: string;
  quantity: number;
  totalQuantity: number;
  createdAt: string;
}

interface WinnersListProps {
  isOpen: boolean;
  onClose: () => void;
}

const WinnersList: React.FC<WinnersListProps> = ({ isOpen, onClose }) => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingPrizeId, setDeletingPrizeId] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchWinners();
    }
  }, [isOpen]);

  const fetchWinners = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/winners');
      if (response.ok) {
        const data = await response.json();
        setWinners(data.winners || []);
      } else {
        setError('Dështoi marrja e fituesve');
      }
    } catch (err) {
      console.error('Error fetching winners:', err);
      setError('Gabim në lidhje me serverin');
    } finally {
      setLoading(false);
    }
  };

  // Delete single winner
  const handleDeleteWinner = async (winnerId: string) => {
    if (!confirm('Jeni të sigurt që dëshironi të fshini këtë fitues?')) {
      return;
    }

    try {
      setDeletingId(winnerId);
      const response = await fetch(`/api/winners?id=${winnerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setWinners(prev => prev.filter(w => w._id !== winnerId));
      } else {
        const data = await response.json();
        alert(data.message || 'Dështoi fshirja e fituesit');
      }
    } catch (err) {
      console.error('Error deleting winner:', err);
      alert('Gabim në lidhje me serverin');
    } finally {
      setDeletingId(null);
    }
  };

  // Delete all winners for a prize
  const handleDeletePrizeWinners = async (prizeId: number) => {
    if (!confirm('Jeni të sigurt që dëshironi të fshini të gjithë fituesit për këtë çmim?')) {
      return;
    }

    try {
      setDeletingPrizeId(prizeId);
      const response = await fetch(`/api/winners?prizeId=${prizeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setWinners(prev => prev.filter(w => w.prizeId !== prizeId));
      } else {
        const data = await response.json();
        alert(data.message || 'Dështoi fshirja e fituesve');
      }
    } catch (err) {
      console.error('Error deleting prize winners:', err);
      alert('Gabim në lidhje me serverin');
    } finally {
      setDeletingPrizeId(null);
    }
  };

  // Delete all winners
  const handleDeleteAll = async () => {
    if (!confirm('Jeni të sigurt që dëshironi të fshini të gjithë fituesit? Kjo veprim nuk mund të zhbëhet!')) {
      return;
    }

    try {
      setDeletingPrizeId(-1); // Use -1 as flag for deleting all
      const response = await fetch('/api/winners', {
        method: 'DELETE',
      });

      if (response.ok) {
        setWinners([]);
      } else {
        const data = await response.json();
        alert(data.message || 'Dështoi fshirja e fituesve');
      }
    } catch (err) {
      console.error('Error deleting all winners:', err);
      alert('Gabim në lidhje me serverin');
    } finally {
      setDeletingPrizeId(null);
    }
  };

  // Download winners as PDF
  const handleDownloadPdf = () => {
    if (winners.length === 0) {
      alert('Nuk ka fitues për t\'u shkarkuar.');
      return;
    }

    try {
      setExporting(true);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - (margin * 2);

      // Title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      const title = 'Lista e Fituesve';
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pageWidth - titleWidth) / 2, 20);

      // Generated date
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const generatedAt = new Date().toLocaleString('sq-AL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const dateText = `Gjeneruar: ${generatedAt}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.text(dateText, (pageWidth - dateWidth) / 2, 27);

      let y = 35;
      const lineHeight = 7;
      const bottomMargin = pageHeight - 20;

      // Group winners by prize for better organization
      const winnersByPrize = winners.reduce((acc, winner) => {
        if (!acc[winner.prizeId]) {
          acc[winner.prizeId] = [];
        }
        acc[winner.prizeId].push(winner);
        return acc;
      }, {} as Record<number, Winner[]>);

      const uniquePrizes = Array.from(
        new Map(winners.map(w => [w.prizeId, { id: w.prizeId, name: w.prizeName }])).values()
      );

      uniquePrizes.forEach((prize) => {
        const prizeWinners = winnersByPrize[prize.id] || [];
        
        // Check if we need a new page
        if (y > bottomMargin - (prizeWinners.length * lineHeight * 4 + 15)) {
          doc.addPage();
          y = 20;
        }

        // Prize header
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        const prizeHeader = `Çmimi: ${prize.name}`;
        doc.text(prizeHeader, margin, y);
        y += lineHeight + 2;

        // Winners for this prize
        prizeWinners.forEach((winner, index) => {
          // Check if we need a new page
          if (y > bottomMargin - (lineHeight * 4)) {
            doc.addPage();
            y = 20;
          }

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          
          // Winner number and name
          doc.setFont('helvetica', 'bold');
          const winnerText = `${index + 1}. ${winner.fullName}`;
          doc.text(winnerText, margin + 5, y);
          y += lineHeight;

          // Phone
          doc.setFont('helvetica', 'normal');
          doc.text(`   Telefon: ${winner.phone}`, margin + 5, y);
          y += lineHeight;

          // Quantity
          doc.text(`   Sasi: ${winner.quantity} ${winner.quantity > 1 ? 'copë' : 'copë'} (${winner.quantity}/${winner.totalQuantity})`, margin + 5, y);
          y += lineHeight;

          // Date
          const winnerDate = new Date(winner.createdAt).toLocaleDateString('sq-AL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          doc.text(`   Data: ${winnerDate}`, margin + 5, y);
          y += lineHeight + 2;
        });

        y += 3; // Extra space between prize groups
      });

      // Save PDF
      doc.save(`fituesit_${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      alert(`Dështoi gjenerimi i PDF: ${errorMessage}. Ju lutem provoni përsëri.`);
    } finally {
      setExporting(false);
    }
  };

  // Group winners by prize
  const winnersByPrize = winners.reduce((acc, winner) => {
    if (!acc[winner.prizeId]) {
      acc[winner.prizeId] = [];
    }
    acc[winner.prizeId].push(winner);
    return acc;
  }, {} as Record<number, Winner[]>);

  // Get unique prizes
  const uniquePrizes = Array.from(
    new Map(winners.map(w => [w.prizeId, { id: w.prizeId, name: w.prizeName, image: w.prizeImage, totalQuantity: w.totalQuantity }])).values()
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-6xl w-full mx-2 sm:mx-4 relative shadow-2xl border border-gray-200 max-h-[95vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-anton text-center text-gray-900 mb-2">
              Lista e Fituesve
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2">
              <p className="text-center text-xs sm:text-sm text-gray-500 font-bwseidoround-thin">
                {winners.length} fitues total
              </p>
              <div className="flex items-center gap-2">
                {winners.length > 0 && (
                  <>
                    <button
                      onClick={handleDownloadPdf}
                      disabled={exporting}
                      className="px-3 py-1.5 bg-[#D92127] text-white font-anton text-xs sm:text-sm rounded-lg hover:bg-[#B71C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {exporting ? 'Duke shkarkuar...' : 'Shkarko PDF'}
                    </button>
                    <button
                      onClick={handleDeleteAll}
                      disabled={deletingPrizeId === -1}
                      className="px-3 py-1.5 bg-red-600 text-white font-anton text-xs sm:text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingPrizeId === -1 ? 'Duke fshirë...' : 'Fshi Të Gjithë'}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#D92127] mx-auto mb-4"></div>
                <p className="font-bwseidoround-thin text-gray-600 text-sm sm:text-base">
                  Duke ngarkuar fituesit...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-red-500 font-bwseidoround-thin text-sm sm:text-base mb-4">
                  {error}
                </p>
                <button
                  onClick={fetchWinners}
                  className="px-4 py-2 bg-[#D92127] text-white font-anton rounded-lg hover:bg-[#B71C1C] transition-colors"
                >
                  Provo Përsëri
                </button>
              </div>
            )}

            {/* Winners List */}
            {!loading && !error && (
              <div className="space-y-6">
                {uniquePrizes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-bwseidoround-thin text-sm sm:text-base">
                      Nuk ka fitues të regjistruar ende
                    </p>
                  </div>
                ) : (
                  uniquePrizes.map((prize) => {
                    const prizeWinners = winnersByPrize[prize.id] || [];
                    const totalGiven = prizeWinners.reduce((sum, w) => sum + w.quantity, 0);
                    
                    return (
                      <div key={prize.id} className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                        {/* Prize Header */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 pb-4 border-b border-gray-300">
                          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                            <Image
                              src={prize.image}
                              alt={prize.name}
                              width={60}
                              height={60}
                              className="object-contain w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                            />
                            <div>
                              <h3 className="text-lg sm:text-xl font-anton text-gray-900">
                                {prize.name}
                              </h3>
                              <p className="text-xs sm:text-sm font-bwseidoround-thin text-gray-600">
                                {totalGiven} nga {prize.totalQuantity} të shpërndara
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeletePrizeWinners(prize.id)}
                            disabled={deletingPrizeId === prize.id}
                            className="px-3 py-1.5 bg-red-600 text-white font-anton text-xs rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingPrizeId === prize.id ? 'Duke fshirë...' : 'Fshi Të Gjithë'}
                          </button>
                        </div>

                        {/* Winners for this prize */}
                        <div className="space-y-3">
                          {prizeWinners.map((winner, index) => (
                            <motion.div
                              key={winner._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow"
                            >
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                                <div className="flex items-center space-x-3 flex-1">
                                  <div className="flex-shrink-0 w-8 h-8 bg-[#D92127] text-white rounded-full flex items-center justify-center font-anton text-sm">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-base sm:text-lg font-bwseidoround-medium text-gray-900 truncate">
                                      {winner.fullName}
                                    </p>
                                    <p className="text-xs sm:text-sm font-bwseidoround-thin text-gray-600">
                                      {winner.phone}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <p className="text-sm font-bwseidoround-medium text-gray-900">
                                      Sasi: {winner.quantity} {winner.quantity > 1 ? 'copë' : 'copë'}
                                    </p>
                                    <p className="text-xs font-bwseidoround-thin text-gray-500">
                                      {new Date(winner.createdAt).toLocaleDateString('sq-AL', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteWinner(winner._id)}
                                    disabled={deletingId === winner._id}
                                    className="px-3 py-1.5 bg-red-600 text-white font-anton text-xs rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                    title="Fshi fituesin"
                                  >
                                    {deletingId === winner._id ? (
                                      <span className="animate-spin">⏳</span>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinnersList;

