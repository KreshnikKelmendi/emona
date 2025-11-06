"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftsModal: React.FC<GiftsModalProps> = ({ isOpen, onClose }) => {
  // Gifts data array
  const gifts = [
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
      id: 3,
      image: "/assets/shperblime-01.png",
      title: "1x iPhone 17"
    },
    {
      id: 4,
      image: "/assets/shperblime-04.png",
      title: "1x Skuter Elektrik"
    },
    {
      id: 5,
      image: "/assets/shperblime-05.png",
      title: "1x Apple Watch"
    },
    {
      id: 6,
      image: "/assets/shperblime-06.png",
      title: "Derivate në vlerë 50€"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50"
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
            className="absolute top-24 right-8 left-8 pointer-events-none"
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
              className="relative bg-[#FFE0B2] rounded-[8px] p-4 h-full py-16 overflow-hidden lg:py-0 pointer-events-auto"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
          
        

          {/* Modal Body - Static Gifts Display */}
          <motion.div 
            className="flex flex-col h-full overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            
            {/* Mobile Layout - 2-1-3 Pattern (showing all 6 gifts) */}
            <div className="lg:hidden  flex-1 flex flex-col">
              {/* First Row - 2 Gifts */}
              <div className="w-full mx-auto grid grid-cols-2 gap-2 sm:gap-4 px-0 sm:px-4 mb-3 sm:mb-4">
                {gifts.slice(0, 2).map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 15, scale: 0.92 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + (index * 0.15),
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-40 sm:h-48 md:h-56 flex items-center justify-center mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.65 + (index * 0.15),
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={250}
                        height={200}
                        className="max-w-full max-h-full object-contain mx-auto"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.p 
                      className="text-center text-[#280F03] font-anton text-[14px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.75 + (index * 0.15),
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      {gift.title}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Center Gift (TV) */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <motion.div 
                  className="flex flex-col items-center justify-center max-w-xs sm:max-w-md"
                  initial={{ opacity: 0, y: 40, scale: 0.8, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: 20, scale: 0.92 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.9,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {/* Main Gift Image */}
                  <motion.div 
                    className="w-full h-40 sm:h-56 md:h-72 lg:h-80 flex items-center justify-center mb-2 sm:mb-4"
                    initial={{ opacity: 0, scale: 0.4, y: 30 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [1, 1.1, 1],
                      y: 0 
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ 
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      opacity: {
                        duration: 0.8,
                        delay: 0.95
                      },
                      y: {
                        duration: 0.8,
                        delay: 0.95,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                  >
                    <Image 
                      src={gifts[2].image} 
                      alt={gifts[2].title}
                      width={300}
                      height={400}
                      className="max-w-full max-h-full object-contain mx-auto"
                    />
                  </motion.div>
                  
                  {/* Main Gift Title */}
                  <motion.h3 
                    className="text-center text-[#280F03] font-anton text-[14px] leading-tight px-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.1,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    {gifts[2].title}
                  </motion.h3>
                </motion.div>
              </div>

              {/* Last Row - 3 Gifts (showing gifts 3, 4, and 5) */}
              <div className="w-full mx-auto grid grid-cols-3 gap-2 sm:gap-4 px-2 sm:px-4">
                {gifts.slice(3, 6).map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 30, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 15, scale: 0.92 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.2 + (index * 0.15),
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-28 sm:h-36 md:h-44 flex items-center justify-center mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 1.25 + (index * 0.15),
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={220}
                        height={180}
                        className="max-w-full max-h-full object-contain mx-auto"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.h3 
                      className="text-center text-[#280F03] font-anton text-[12px] sm:text-[14px] leading-tight px-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.35 + (index * 0.15),
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      {gift.title}
                    </motion.h3>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Layout - Single Row with 6 Columns */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="w-full mx-auto grid 2xl:pt-14 grid-cols-6 mt-[-15px] pb-10 2xl:pb-44 gap-4 px-4 justify-items-center">
                {gifts.map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center w-full"
                    initial={{ opacity: 0, y: 40, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 20, scale: 0.92 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + (index * 0.15),
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-[420px] 2xl:h-[500px] flex items-center justify-center mb-2"
                      initial={{ opacity: 0, scale: 0.5, y: 30 }}
                      animate={{ 
                        opacity: 1, 
                        scale: index === 2 ? [1, 1.1, 1] : 1,
                        y: 0 
                      }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={index === 2 ? {
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        opacity: {
                          duration: 0.7,
                          delay: 0.65 + (index * 0.15)
                        },
                        y: {
                          duration: 0.7,
                          delay: 0.65 + (index * 0.15),
                          ease: [0.34, 1.56, 0.64, 1]
                        }
                      } : {
                        duration: 0.7,
                        delay: 0.65 + (index * 0.15),
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={280}
                        height={600}
                        className="max-w-full max-h-full object-contain mx-auto"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.h3 
                      className="text-center text-[#280F03] font-anton text-xl leading-tight px-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.75 + (index * 0.15),
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      {gift.title}
                    </motion.h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftsModal;
