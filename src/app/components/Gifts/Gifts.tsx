"use client";

import React, { useState } from 'react';
import GiftsModal from './GiftsModal';

const Gifts = () => {
    const [isLidOpen, setIsLidOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleLid = () => {
        setIsLidOpen(!isLidOpen);
    };

    const handleGiftsClick = () => {
        if (isModalOpen) {
            // If modal is open, close it and reset icon
            setIsModalOpen(false);
            setIsLidOpen(false); // Reset the gift icon to closed state
        } else {
            // If modal is closed, open it and animate icon
            setIsModalOpen(true);
            setIsLidOpen(true); // Animate the gift icon to open state
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsLidOpen(false); // Reset the gift icon to closed state
    };

    return (
        <div className="absolute top-6 right-8 z-50">
            <div className="relative">
                <button
                    onClick={handleGiftsClick}
                    className="group transition-all cursor-pointer duration-300 ease-in-out hover:scale-110 active:scale-95 bg-[#FCC879] p-3 w-[53px] h-[53px] gap-[1.5px] flex flex-col justify-center items-center rounded-full hover:shadow-lg"
                >
               <svg 
                    width="47" 
                    height="21" 
                    viewBox="0 0 47 21" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-all duration-700 ease-in-out origin-bottom group-hover:rotate-[30deg] group-hover:scale-105 ${
                        isLidOpen ? 'rotate-[30deg] scale-105' : 'rotate-0 scale-100'
                    }`}
                >
                    <path d="M17.2191 9.39984e-05C13.1814 -0.0228257 9.25046 4.14857 11.045 9.32843H4.27273C3.13953 9.32843 2.05275 9.81138 1.25146 10.671C0.450166 11.5307 0 12.6966 0 13.9124L0 18.4963C0 19.1042 0.225087 19.6872 0.625732 20.117C1.02638 20.5468 1.56977 20.7883 2.13637 20.7883H21.3636V13.9124H25.6364V20.7883H44.8636C45.4302 20.7883 45.9736 20.5468 46.3743 20.117C46.7749 19.6872 47 19.1042 47 18.4963V13.9124C47 12.6966 46.5498 11.5307 45.7486 10.671C44.9473 9.81138 43.8605 9.32843 42.7273 9.32843H35.955C38.4545 1.83367 29.0545 -3.46079 24.7177 3.00258L23.5 4.74448L22.2823 2.95674C20.9364 0.916884 19.0777 0.0230137 17.2191 9.39984e-05ZM17.0909 4.74448C18.9923 4.74448 19.9536 7.21981 18.6077 8.66375C17.2618 10.1077 14.9546 9.07631 14.9546 7.03645C14.9546 6.42858 15.1796 5.84561 15.5803 5.41578C15.9809 4.98596 16.5243 4.74448 17.0909 4.74448ZM29.9091 4.74448C31.8105 4.74448 32.7718 7.21981 31.4259 8.66375C30.08 10.1077 27.7727 9.07631 27.7727 7.03645C27.7727 6.42858 27.9978 5.84561 28.3985 5.41578C28.7991 4.98596 29.3425 4.74448 29.9091 4.74448Z" fill="black"/>
                </svg>

                <svg width="47" height="21" viewBox="0 0 43 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L0 18.3358C0 19.5515 0.450161 20.7175 1.25145 21.5771C2.05274 22.4368 3.13953 22.9197 4.27273 22.9197H38.4545C39.5877 22.9197 40.6745 22.4368 41.4758 21.5771C42.2771 20.7175 42.7273 19.5515 42.7273 18.3358V0L23.5 0V18.3358H19.2273V0L0 0Z" fill="black"/>
                </svg>
                </button> 
            </div>
            
            {/* Modal */}
            <GiftsModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Gifts;
