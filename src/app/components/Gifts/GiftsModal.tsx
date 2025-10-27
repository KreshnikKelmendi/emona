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
      image: "/assets/iphone-17.png",
      title: "x1 Iphone 17"
    },
    {
      id: 2,
      image: "/assets/skuter-2.png", 
      title: "x3 Trotinet Elektrik"
    },
    {
      id: 3,
      image: "/assets/tv-3.png",
      title: "TV Smart 55\""
    },
    {
      id: 4,
      image: "/assets/money.png",
      title: "x20 Para Cash 20Euro"
    },
    {
      id: 5,
      image: "/assets/paketimi.png",
      title: "x20 Caj Emona"
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
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1
            }}
          >
            {/* Speech bubble pointer */}
            <motion.div 
              className="absolute -top-2 right-4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#FFE0B2] z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.3,
                ease: "easeOut"
              }}
            />
            
            {/* Modal Content */}
            <motion.div 
              className="relative bg-[#FFE0B2] rounded-[8px] p-4 h-full py-16 overflow-hidden lg:py-0 pointer-events-auto"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
          
          {/* Modal Header */}
          <motion.div 
            className="text-center mt-2 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: "easeOut"
            }}
          >
            <motion.p 
              className="text-[27px] mt-[-15px] lg:mt-0 font-anton text-black px-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
                ease: "easeOut"
              }}
            >
              Zbulo Shpërblimet!
            </motion.p>
            <motion.p 
              className='text-center font-bwseidoround-thin text-xs sm:text-sm pt-2 sm:pt-3 px-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.7,
                ease: "easeOut"
              }}
            >
              Merr pjesë në lojën shpërblyese dhe përjeto dashurinë që vjen me çdo gllënjkë.
            </motion.p>
          </motion.div>

          {/* Modal Body - Static Gifts Display */}
          <motion.div 
            className="flex flex-col h-full overflow-y-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.6,
              ease: "easeOut"
            }}
          >
            
            {/* Mobile Layout - Original 2-1-2 Pattern */}
            <div className="lg:hidden pt-10 flex-1 flex flex-col">
              {/* First Row - 2 Gifts */}
              <div className="w-full mx-auto grid grid-cols-2 gap-2 sm:gap-4 px-0 sm:px-4 mb-3 sm:mb-4">
                {gifts.slice(0, 2).map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.8 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-32 flex items-center justify-center mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.9 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={200}
                        height={128}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.p 
                      className="text-center text-[#280F03] font-anton text-[14px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.0 + (index * 0.1),
                        ease: "easeOut"
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
                  className="flex flex-col items-center justify-center max-w-xs sm:max-w-sm"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.1,
                    ease: "easeOut"
                  }}
                >
                  {/* Main Gift Image */}
                  <motion.div 
                    className="w-full h-32 sm:h-48 md:h-64 flex items-center justify-center mb-2 sm:mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.2,
                      ease: "easeOut"
                    }}
                  >
                    <Image 
                      src={gifts[2].image} 
                      alt={gifts[2].title}
                      width={200}
                      height={256}
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                  
                  {/* Main Gift Title */}
                  <motion.h3 
                    className="text-center text-[#280F03] font-anton text-[14px] leading-tight px-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 1.3,
                      ease: "easeOut"
                    }}
                  >
                    {gifts[2].title}
                  </motion.h3>
                </motion.div>
              </div>

              {/* Last Row - 2 Gifts */}
              <div className="w-full mx-auto grid grid-cols-2 gap-2 sm:gap-4 px-2 sm:px-4">
                {gifts.slice(3, 5).map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.4 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-20 sm:h-24 md:h-32 flex items-center justify-center mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.5 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={200}
                        height={128}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.h3 
                      className="text-center text-[#280F03] font-anton text-[14px] leading-tight px-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.6 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    >
                      {gift.title}
                    </motion.h3>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop Layout - Single Row with 5 Columns */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="w-full mx-auto grid 2xl:pt-14 grid-cols-5 mt-[-15px] pb-10 2xl:pb-44 gap-4 px-4 justify-items-center">
                {gifts.map((gift, index) => (
                  <motion.div 
                    key={gift.id} 
                    className="flex flex-col items-center justify-center w-full"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + (index * 0.15),
                      ease: "easeOut"
                    }}
                  >
                    {/* Gift Image */}
                    <motion.div 
                      className="w-full h-96 flex items-center justify-center mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.9 + (index * 0.15),
                        ease: "easeOut"
                      }}
                    >
                      <Image 
                        src={gift.image} 
                        alt={gift.title}
                        width={200}
                        height={384}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                    
                    {/* Gift Title */}
                    <motion.h3 
                      className="text-center text-[#280F03] font-anton text-xl leading-tight px-1"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.0 + (index * 0.15),
                        ease: "easeOut"
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
