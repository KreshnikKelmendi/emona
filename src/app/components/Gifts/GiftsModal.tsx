"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftsModal: React.FC<GiftsModalProps> = ({ isOpen, onClose }) => {
  const gifts = [
    {
      id: 5,
      image: "/assets/shperblime-05.png",
      title: "Apple Watch"
    },
    {
      id: 4,
      image: "/assets/shperblime-04.png",
      title: "Skuter Elektrik"
    },

    {
      id: 3,
      image: "/assets/shperblime-01.png",
      title: "iPhone 17"
    },
    {
      id: 1,
      image: "/assets/shperblime-02.png",
      title: "Paketime Çaji"
    },
    {
      id: 2,
      image: "/assets/shperblime-03.png", 
      title: "Para të gatshme"
    },
    {
      id: 6,
      image: "/assets/shperblime-06.png",
      title: "Derivate në vlerë 50€"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setHasCompletedCycle(false);
      return;
    }

    if (hasCompletedCycle) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === gifts.length - 1) {
          window.clearInterval(intervalId);
          window.setTimeout(() => setHasCompletedCycle(true), 800);
          return prevIndex;
        }

        return prevIndex + 1;
      });
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [isOpen, gifts.length, hasCompletedCycle]);

  const currentGift = gifts[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop - Click outside to close */}
          <motion.div 
            className="absolute inset-0 bg-transparent pointer-events-auto"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Modal Content - Positioned like speech bubble from image */}
          <motion.div 
            className="absolute top-24 right-7.5 left-7.5 pointer-events-none"
            initial={{ opacity: 0, y: -80, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.05
            }}
          >
            {/* Speech bubble pointer */}
            <motion.div 
              className="absolute -top-2 right-4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#FFE0B2] z-10"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.25,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="relative bg-[#FFE0B2] rounded-[18px] p-6 sm:p-10 shadow-[0_24px_60px_rgba(40,15,3,0.22)] ring-1 ring-[#ffffff40] h-full min-h-[min(88vh,720px)] pointer-events-auto flex flex-col"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-[#280F03]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" opacity="0.2" />
                  <path d="M9.75 9.75L14.25 14.25" />
                  <path d="M14.25 9.75L9.75 14.25" />
                </svg>
              </motion.button>

              <motion.div 
                className="flex flex-col items-center justify-center gap-6 sm:gap-10 h-full flex-1 px-2 sm:px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <AnimatePresence mode="wait">
                  {!hasCompletedCycle ? (
                    <motion.div
                      key="slider"
                      className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentGift.id}
                          className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[440px] xl:max-w-[500px] 2xl:max-w-[560px] aspect-[4/5] sm:aspect-[7/9] lg:aspect-[3/4] 2xl:aspect-[4/5] flex items-center justify-center"
                          style={{ maxHeight: 'min(65vh, 520px)' }}
                          initial={{ opacity: 0, scale: 0.85, rotate: -6, y: 30 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                          exit={{ opacity: 0, scale: 0.85, rotate: 6, y: -30 }}
                          transition={{
                            duration: 0.8,
                            ease: [0.34, 1.56, 0.64, 1]
                          }}
                        >
                          <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.6, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: -10 }}
                            transition={{
                              duration: 0.6,
                              ease: [0.34, 1.56, 0.64, 1]
                            }}
                          >
                            <Image 
                              src={currentGift.image}
                              alt={currentGift.title}
                              fill
                              sizes="(max-width: 768px) 80vw, 40vw"
                              className="object-contain"
                              priority
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        <motion.h3 
                          key={currentGift.title}
                          className="text-center text-[#280F03] font-anton text-xl sm:text-2xl md:text-3xl uppercase  drop-shadow-[0_8px_16px_rgba(255,176,94,0.35)]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                        >
                          {currentGift.title}
                        </motion.h3>
                      </AnimatePresence>

                      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1">
                        {gifts.map((gift, index) => (
                          <motion.button
                            key={gift.id}
                            type="button"
                            className="relative w-2.5 h-2.5 sm:w-3 sm:h-3"
                            onClick={() => setCurrentIndex(index)}
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Show ${gift.title}`}
                          >
                            <span
                              className={`absolute inset-0 rounded-full transition-all ${
                                currentIndex === index
                                  ? 'bg-[#280F03] scale-105'
                                  : 'bg-[#280F03]/30 scale-75'
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="grid"
                      className="w-full h-full flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.h3
                        className="text-center text-[#280F03] font-anton text-xl sm:text-2xl md:text-3xl uppercase mb-6 sm:mb-10 drop-shadow-[0_12px_20px_rgba(255,180,90,0.35)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      >
                        Shpërblimet
                      </motion.h3>
                      <div className="mx-auto w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 overflow-y-auto pb-6">
                        {gifts.map((gift, index) => (
                          <motion.div
                            key={gift.id}
                            className="flex flex-col items-center justify-start gap-3"
                            initial={{ opacity: 0, y: 30, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.08,
                              ease: [0.34, 1.56, 0.64, 1]
                            }}
                          >
                            <div className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-square flex items-center justify-center bg-white/25 rounded-[20px] p-4 sm:p-5 ">
                              <Image
                                src={gift.image}
                                alt={gift.title}
                                width={260}
                                height={260}
                                className="object-contain max-h-full"
                                priority={index < 3}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftsModal;
