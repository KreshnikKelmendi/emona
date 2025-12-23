"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Prize {
  id: number;
  name: string;
  image: string;
}

interface PrizeConfig {
  prizeId: number;
  totalQuantity: number; // Total number of winners needed for this prize
  winnersPicked: number; // How many winners have been picked so far
}

interface User {
  _id: string;
  fullName: string;
  phone: string;
  fileUpload: string;
  createdAt: string;
}

interface Winner {
  prizeId: number;
  [key: string]: unknown;
}

interface PrizeRouletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const prizes: Prize[] = [
  { id: 1, name: "iPhone 17", image: "/assets/shperblime-01.webp" },
  { id: 2, name: "Paketime Caji Emona", image: "/assets/shperblime-02.webp" },
  { id: 3, name: "Para te Gatshme", image: "/assets/shperblime-03.webp" },
  { id: 4, name: "Skuter Elektrik", image: "/assets/shperblime-04.webp" },
  { id: 5, name: "Apple Smartwatch", image: "/assets/shperblime-05.webp" },
  { id: 6, name: "Derivate në vlerë 50 euro", image: "/assets/shperblime-06.webp" },
];

const PrizeRoulette: React.FC<PrizeRouletteProps> = ({ isOpen, onClose }) => {
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isPicking, setIsPicking] = useState(false);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
  const [prizeConfigs, setPrizeConfigs] = useState<Record<number, PrizeConfig>>({});
  const [isSavingWinner, setIsSavingWinner] = useState(false);
  const [isWinnerAccepted, setIsWinnerAccepted] = useState(false);
  const [totalQuantityInput, setTotalQuantityInput] = useState<string>(''); // Total quantity needed for selected prize
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch winners count for each prize to track distribution
  const fetchWinnersCount = useCallback(async () => {
    try {
      const response = await fetch('/api/winners');
      if (response.ok) {
        const data = await response.json();
        const winners = data.winners || [];
        
        // Count winners per prize
        const countByPrize: Record<number, number> = {};
        prizes.forEach(prize => {
          countByPrize[prize.id] = winners.filter((w: Winner) => w.prizeId === prize.id).length;
        });
        
        // Update prize configs with current winners count
        setPrizeConfigs(prev => {
          const updated = { ...prev };
          prizes.forEach(prize => {
            if (updated[prize.id]) {
              updated[prize.id].winnersPicked = countByPrize[prize.id] || 0;
            }
          });
          return updated;
        });
      }
    } catch (error) {
      console.error('Error fetching winners count:', error);
    }
  }, []);

  // Fetch users when component opens
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
      fetchWinnersCount();
    }
  }, [isOpen, fetchWinnersCount]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const startPicking = () => {
    if (!selectedPrize || users.length === 0 || isPicking) return;
    
    const config = prizeConfigs[selectedPrize.id];
    if (!config) {
      alert('Ju lutem vendosni sasinë totale të nevojshme për këtë çmim');
      return;
    }
    
    // Check if all winners have been picked
    if (config.winnersPicked >= config.totalQuantity) {
      alert('Të gjithë fituesit për këtë çmim janë zgjedhur tashmë');
      return;
    }

    setIsPicking(true);
    setSelectedWinner(null);
    
    // Pre-determine the winner
    const randomWinnerIndex = Math.floor(Math.random() * users.length);
    const targetWinner = users[randomWinnerIndex];

    // Even shorter animation so winners are announced faster
    const minCycles = 0.2;
    const totalIterations = Math.floor(users.length * minCycles) + randomWinnerIndex;
    let currentIteration = 0;
    let currentIndex = Math.floor(Math.random() * users.length);
    setCurrentDisplayIndex(currentIndex);
    let speed = 20; // Start ultra-fast

    const animate = () => {
      currentIteration++;
      currentIndex = (currentIndex + 1) % users.length;
      setCurrentDisplayIndex(currentIndex);

      // Very fast deceleration
      if (currentIteration < totalIterations * 0.8) {
        // First 80% - keep it snappy
        speed = Math.min(speed + 3, 60);
      } else {
        // Last 20% - brief slowdown
        speed = Math.min(speed + 10, 120);
      }

      // Check if we've reached the target
      if (currentIteration < totalIterations) {
        animationIntervalRef.current = setTimeout(animate, speed);
      } else {
        // Final selection - ensure we land on the winner
        setCurrentDisplayIndex(randomWinnerIndex);
        setTimeout(() => {
          setSelectedWinner(targetWinner);
          setIsPicking(false);
          setIsWinnerAccepted(false); // Reset acceptance state for new winner
        }, 40); // Very quick delay
        
        // Clear interval
        if (animationIntervalRef.current) {
          clearTimeout(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      }
    };

    // Start animation immediately
    animationIntervalRef.current = setTimeout(animate, speed);
  };

  // Save winner to database
  const saveWinner = async (winner: User) => {
    if (!selectedPrize) return;

    const config = prizeConfigs[selectedPrize.id];
    if (!config) return;

    try {
      setIsSavingWinner(true);
      
      // Each winner gets 1 unit of the prize
      const quantity = 1;
      
      const response = await fetch('/api/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: winner._id,
          fullName: winner.fullName,
          phone: winner.phone,
          prizeId: selectedPrize.id,
          prizeName: selectedPrize.name,
          prizeImage: selectedPrize.image,
          quantity: quantity,
          totalQuantity: config.totalQuantity
        }),
      });

      if (response.ok) {
        // Refresh winners count from database
        await fetchWinnersCount();
        setIsWinnerAccepted(true);
        console.log('Winner saved successfully');
      } else {
        console.error('Failed to save winner');
        alert('Dështoi ruajtja e fituesit. Ju lutem provoni përsëri.');
      }
    } catch (error) {
      console.error('Error saving winner:', error);
      alert('Gabim gjatë ruajtjes së fituesit. Ju lutem provoni përsëri.');
    } finally {
      setIsSavingWinner(false);
    }
  };

  // Handle accepting the winner
  const handleAcceptWinner = async () => {
    if (!selectedWinner) return;
    await saveWinner(selectedWinner);
  };

  // Handle rejecting the winner - quick re-pick
  const handleRejectWinner = () => {
    setSelectedWinner(null);
    setIsWinnerAccepted(false);
    // Immediately start picking again
    startPicking();
  };

  const resetSelection = () => {
    setSelectedPrize(null);
    setSelectedWinner(null);
    setCurrentDisplayIndex(0);
    setIsPicking(false);
    setIsWinnerAccepted(false);
    setTotalQuantityInput(''); // Reset quantity input
    
    // Clear any running animation
    if (animationIntervalRef.current) {
      clearTimeout(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };

  // Handle prize selection with quantity setup
  const handlePrizeSelection = (prize: Prize) => {
    setSelectedPrize(prize);
    setTotalQuantityInput('');
    
    // If config exists, show it
    if (prizeConfigs[prize.id]) {
      setTotalQuantityInput(prizeConfigs[prize.id].totalQuantity.toString());
    }
  };

  // Handle setting total quantity for a prize
  const handleSetQuantity = () => {
    if (!selectedPrize) return;
    
    const quantity = parseInt(totalQuantityInput);
    if (isNaN(quantity) || quantity < 1) {
      alert('Ju lutem shkruani një numër të vlefshëm (më të madh se 0)');
      return;
    }

    setPrizeConfigs(prev => ({
      ...prev,
      [selectedPrize.id]: {
        prizeId: selectedPrize.id,
        totalQuantity: quantity,
        winnersPicked: prev[selectedPrize.id]?.winnersPicked || 0
      }
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      resetSelection();
    }
    
    // Cleanup on unmount
    return () => {
      if (animationIntervalRef.current) {
        clearTimeout(animationIntervalRef.current);
      }
    };
  }, [isOpen]);

  const currentDisplayUser = users[currentDisplayIndex] || null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-2 sm:mx-4 relative shadow-2xl border border-gray-200 max-h-[95vh] overflow-y-auto"
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
              Shpall Fituesit
            </h2>
            {users.length > 0 && (
              <p className="text-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-bwseidoround-thin">
                {users.length} pjesëmarrës në lojë
              </p>
            )}

            {/* Prize Selection */}
            {!selectedPrize && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-anton text-center text-gray-800 mb-4 sm:mb-6">
                  Zgjidh Shpërblimin
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {prizes.map((prize) => {
                    const config = prizeConfigs[prize.id];
                    const isComplete = config && config.winnersPicked >= config.totalQuantity;
                    const remaining = config ? config.totalQuantity - config.winnersPicked : null;
                    
                    return (
                      <button
                        key={prize.id}
                        onClick={() => handlePrizeSelection(prize)}
                        className={`bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-all hover:shadow-md border border-gray-200 hover:border-[#D92127] disabled:opacity-50 disabled:cursor-not-allowed group ${
                          isComplete ? 'opacity-60' : ''
                        }`}
                        disabled={loadingUsers || users.length === 0}
                      >
                        <Image
                          src={prize.image}
                          alt={prize.name}
                          width={60}
                          height={60}
                          className="object-contain mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                        />
                        <p className="text-[10px] sm:text-xs font-anton text-gray-800 text-center leading-tight px-1">
                          {prize.name}
                        </p>
                        {config && (
                          <p className={`text-[9px] sm:text-[10px] font-bwseidoround-thin text-center mt-1 ${
                            isComplete ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {isComplete 
                              ? `E përfunduar (${config.totalQuantity}/${config.totalQuantity})`
                              : `${remaining} të mbetura nga ${config.totalQuantity}`
                            }
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
                {users.length === 0 && !loadingUsers && (
                  <p className="text-center text-red-500 font-bwseidoround-thin mt-4 text-xs sm:text-sm">
                    Nuk ka pjesëmarrës për të zgjedhur fituesin
                  </p>
                )}
              </div>
            )}

            {/* Prize Selected - Show Quantity Setup or Picking */}
            {selectedPrize && !selectedWinner && !isPicking && (() => {
              const config = prizeConfigs[selectedPrize.id];
              const hasConfig = config !== undefined;
              
              return (
                <div className="space-y-4 sm:space-y-6">
                  {/* Selected Prize Display */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                    <Image
                      src={selectedPrize.image}
                      alt={selectedPrize.name}
                      width={70}
                      height={70}
                      className="object-contain w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    />
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl font-anton text-gray-900">
                        {selectedPrize.name}
                      </p>
                      {hasConfig && (
                        <p className="text-xs sm:text-sm font-bwseidoround-thin text-gray-600 mt-1">
                          {config.winnersPicked >= config.totalQuantity 
                            ? `E përfunduar: ${config.totalQuantity}/${config.totalQuantity} fitues`
                            : `Progres: ${config.winnersPicked}/${config.totalQuantity} fitues`
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity Setup - Only show if not configured or if all winners picked */}
                  {(!hasConfig || (hasConfig && config.winnersPicked >= config.totalQuantity)) && (
                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-200">
                      <label className="block text-sm sm:text-base font-anton text-gray-900 mb-2">
                        {hasConfig && config.winnersPicked >= config.totalQuantity
                          ? 'Ndrysho sasinë totale të nevojshme:'
                          : 'Shkruani sa fitues nevojiten për këtë çmim:'
                        }
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="1"
                          value={totalQuantityInput}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
                              setTotalQuantityInput(value);
                            }
                          }}
                          placeholder="Numri i fituesve"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D92127] focus:border-[#D92127] font-bwseidoround-thin text-gray-900 text-lg"
                        />
                        <button
                          onClick={handleSetQuantity}
                          disabled={!totalQuantityInput || parseInt(totalQuantityInput) < 1}
                          className={`px-6 py-3 bg-[#D92127] text-white font-anton rounded-lg hover:bg-[#B71C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {hasConfig && config.winnersPicked >= config.totalQuantity ? 'Përditëso' : 'Konfirmo'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Only show if configured and not complete */}
                  {hasConfig && config.winnersPicked < config.totalQuantity && (
                    <div className="space-y-2 sm:space-y-3">
                      <button
                        onClick={startPicking}
                        disabled={users.length === 0}
                        className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-[#D92127] text-white font-anton text-lg sm:text-xl rounded-lg sm:rounded-xl shadow-lg transition-all ${
                          users.length === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#B71C1C] hover:shadow-xl active:scale-98'
                        }`}
                      >
                        Shpall Fituesin ({config.totalQuantity - config.winnersPicked} të mbetura)
                      </button>
                      <button
                        onClick={resetSelection}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 font-anton rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base"
                      >
                        Ndrysho Shpërblimin
                      </button>
                    </div>
                  )}

                  {/* Show message if all winners picked */}
                  {hasConfig && config.winnersPicked >= config.totalQuantity && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <p className="text-green-800 font-bwseidoround-medium">
                        Të gjithë fituesit për këtë çmim janë zgjedhur! ({config.totalQuantity}/{config.totalQuantity})
                      </p>
                      <button
                        onClick={resetSelection}
                        className="mt-3 px-4 py-2 bg-gray-100 text-gray-700 font-anton rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        Zgjedh Tjetër Çmim
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Winner Picking Animation */}
            {selectedPrize && isPicking && (
              <div className="space-y-4 sm:space-y-6">
                {/* Selected Prize Display */}
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <Image
                    src={selectedPrize.image}
                    alt={selectedPrize.name}
                    width={50}
                    height={50}
                    className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                  <p className="text-base sm:text-lg font-anton text-gray-900">
                    {selectedPrize.name}
                  </p>
                </div>

                {/* Animated Name Display - Only Names */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 min-h-[180px] sm:min-h-[200px] flex items-center justify-center border-2 border-gray-200">
                  {currentDisplayUser ? (
                    <motion.div
                      key={currentDisplayIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.1 }}
                      className="text-center w-full px-2"
                    >
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bwseidoround-medium text-gray-900 break-words">
                        {currentDisplayUser.fullName}
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-gray-400">Duke ngarkuar...</p>
                  )}
                </div>
              </div>
            )}

            {/* Winner Display */}
            {selectedPrize && selectedWinner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Confetti/Fire Effect - Only show when accepted */}
                {isWinnerAccepted && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {[...Array(50)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#D92127] rounded-full"
                        initial={{
                          x: '50%',
                          y: '50%',
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{
                          duration: 2,
                          delay: Math.random() * 0.5,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={`gold-${i}`}
                        className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                        initial={{
                          x: '50%',
                          y: '50%',
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{
                          duration: 2.5,
                          delay: Math.random() * 0.5,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
                  {/* Celebration Text */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-center mb-4 sm:mb-6"
                  >
                    {isWinnerAccepted ? (
                      <>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton text-[#D92127] mb-2">
                          URIME!
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl font-anton text-[#D92127]">
                          Fituesi është zgjedhur dhe pranuar!
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-anton text-gray-800 mb-2">
                          Fitues i Zgjedhur
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg font-anton text-gray-600">
                          Ju lutem kontrolloni informacionet para pranimit
                        </p>
                      </>
                    )}
                  </motion.div>
                  
                  {/* Prize Info */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-md">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-5">
                      <Image
                        src={selectedPrize.image}
                        alt={selectedPrize.name}
                        width={70}
                        height={70}
                        className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                      />
                      <div className="text-center sm:text-left">
                        <p className="text-lg sm:text-xl font-anton text-gray-900">
                          {selectedPrize.name}
                        </p>
                        {prizeConfigs[selectedPrize.id] && (
                          <p className="text-sm font-bwseidoround-thin text-gray-600 mt-1">
                            Progres: {prizeConfigs[selectedPrize.id].winnersPicked}/{prizeConfigs[selectedPrize.id].totalQuantity} fitues
                            {!isWinnerAccepted && (
                              <span className="text-gray-500"> (pas pranimit: {prizeConfigs[selectedPrize.id].winnersPicked + 1})</span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Winner Info */}
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
                    <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5">
                      {selectedWinner.fileUpload && selectedWinner.fileUpload.startsWith('data:image/') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        >
                          <Image
                            src={selectedWinner.fileUpload}
                            alt={selectedWinner.fullName}
                            width={130}
                            height={130}
                            className="object-cover rounded-full border-3 border-[#D92127] shadow-md w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                          />
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center w-full"
                      >
                        <p className="text-xl sm:text-2xl md:text-3xl font-bwseidoround-medium text-gray-900 mb-2 break-words px-2">
                          {selectedWinner.fullName}
                        </p>
                        <p className="text-base sm:text-lg font-bwseidoround-thin text-gray-600 mb-3 sm:mb-4">
                          {selectedWinner.phone}
                        </p>
                        {selectedWinner.fileUpload && selectedWinner.fileUpload.startsWith('data:image/') && (
                          <button
                            onClick={() => {
                              const newWindow = window.open();
                              if (newWindow) {
                                newWindow.document.write(`
                                  <html>
                                    <head><title>Skedar - ${selectedWinner.fullName}</title></head>
                                    <body style="margin:0; padding:20px; background:#f5f5f5; display:flex; justify-content:center; align-items:center;">
                                      <img src="${selectedWinner.fileUpload}" style="max-width:100%; max-height:100%; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1);" />
                                    </body>
                                  </html>
                                `);
                              }
                            }}
                            className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 font-bwseidoround-thin rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                          >
                            Shiko produktin në faturë
                          </button>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Acceptance Status */}
                  {!isWinnerAccepted && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-center text-blue-800 font-bwseidoround-medium text-sm sm:text-base mb-3">
                        Ju lutem kontrolloni informacionet e fituesit përpara se ta pranoni
                      </p>
                      
                      {/* Accept/Reject Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                        <button
                          onClick={handleAcceptWinner}
                          disabled={isSavingWinner}
                          className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-anton rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors shadow-md text-base sm:text-lg ${
                            isSavingWinner ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          ✓ Pranoj Fituesin
                        </button>
                        <button
                          onClick={handleRejectWinner}
                          disabled={isSavingWinner || isPicking}
                          className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-anton rounded-lg sm:rounded-xl hover:bg-red-700 transition-colors shadow-md text-base sm:text-lg ${
                            (isSavingWinner || isPicking) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          ✗ Refuzoj dhe Zgjedh Tjetër
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Saving indicator */}
                  {isSavingWinner && (
                    <div className="text-center py-2">
                      <p className="text-sm font-bwseidoround-thin text-gray-600">
                        Duke ruajtur fituesin...
                      </p>
                    </div>
                  )}

                  {/* Accepted confirmation */}
                  {isWinnerAccepted && !isSavingWinner && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-center text-green-800 font-bwseidoround-medium text-sm sm:text-base">
                        ✓ Fituesi u pranua dhe u ruajt me sukses!
                      </p>
                    </div>
                  )}

                  {/* Action Buttons - Show after acceptance or for navigation */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
                    {isWinnerAccepted ? (
                      <>
                        <button
                          onClick={resetSelection}
                          disabled={isSavingWinner}
                          className={`w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 bg-[#D92127] text-white font-anton rounded-lg sm:rounded-xl hover:bg-[#B71C1C] transition-colors shadow-md text-sm sm:text-base ${
                            isSavingWinner ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Zgjedh Tjetër Fitues
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white font-anton rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors shadow-md text-sm sm:text-base"
                        >
                          Mbyll
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={onClose}
                        disabled={isSavingWinner}
                        className={`w-full px-5 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white font-anton rounded-lg sm:rounded-xl hover:bg-gray-600 transition-colors shadow-md text-sm sm:text-base ${
                          isSavingWinner ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Mbyll
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {loadingUsers && (
              <div className="text-center py-8 sm:py-12">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#D92127] mx-auto mb-4"></div>
                <p className="font-bwseidoround-thin text-gray-600 text-sm sm:text-base">
                  Duke ngarkuar pjesëmarrësit...
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrizeRoulette;
