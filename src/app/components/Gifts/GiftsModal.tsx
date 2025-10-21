"use client";

import React from 'react';

interface GiftsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftsModal: React.FC<GiftsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop - Click outside to close */}
      <div 
        className="absolute inset-0 bg-transparent pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Modal Content - Positioned like speech bubble from image */}
      <div className="absolute top-24 right-8 left-8 pointer-events-none transform transition-all duration-500 ease-out animate-in slide-in-from-top-6 fade-in">
        {/* Speech bubble pointer */}
        <div className="absolute -top-2 right-4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#FCC879] z-10 transform transition-all duration-400 delay-150 animate-in slide-in-from-top-3 fade-in" />
        
        {/* Modal Content */}
        <div className="relative bg-[#FCC879] rounded-[8px] shadow-2xl p-4 h-[80vh] lg:h-[85vh] transform transition-all duration-600 ease-out animate-in zoom-in-90 slide-in-from-top-4 fade-in delay-200 pointer-events-auto">
         

          {/* Modal Header */}
          <div className="text-left mt-4 transform transition-all duration-700 ease-out animate-in slide-in-from-left-6 fade-in delay-400">
            <p className="text-[27px] text-center font-anton text-black">
              Zbulo Shpërblimet!
            </p>
          </div>

          {/* Modal Body */}
          <div className="mt-6 transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-6 fade-in delay-600">
            <p className="text-black font-bwseidoround-thin text-sm">
              Përmbajtja e modalit do të shtohet këtu...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftsModal;
