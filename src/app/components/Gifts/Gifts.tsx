"use client";

import React, { useState, useEffect, useRef } from 'react';
import GiftsModal from './GiftsModal';

const Gifts = () => {
    const [isLidOpen, setIsLidOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [borderProgress, setBorderProgress] = useState(0);
    const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const borderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Show tooltip automatically when component mounts
    useEffect(() => {
        setShowTooltip(true);
        setIsTyping(true);
        setBorderProgress(0);

        const fullText = "Zbulo Shperblimet";
        let currentIndex = 0;

        const typeText = () => {
            if (currentIndex < fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex + 1));
                currentIndex++;
                typingTimeoutRef.current = setTimeout(typeText, 50); // Faster: 50ms delay between characters
            } else {
                setIsTyping(false);
                // Hide tooltip after typing is complete + 3 seconds
                tooltipTimeoutRef.current = setTimeout(() => {
                    setIsClosing(true);
                    // Actually hide after fade-out animation completes
                    setTimeout(() => {
                        setShowTooltip(false);
                        setIsClosing(false);
                    }, 300); // Match fade-out animation duration
                }, 3000);
            }
        };

        // Start border animation
        const animateBorder = () => {
            setBorderProgress(prev => {
                if (prev >= 100) return 0; // Reset to 0 when complete
                return prev + 2; // Increase by 2% each step
            });
            borderTimeoutRef.current = setTimeout(animateBorder, 30); // 30ms delay for smooth animation
        };

        // Start typing after a short delay
        typingTimeoutRef.current = setTimeout(typeText, 200); // Faster start: 200ms
        
        // Start border animation after typing starts
        borderTimeoutRef.current = setTimeout(animateBorder, 500);

        // Cleanup timeouts on unmount
        return () => {
            if (tooltipTimeoutRef.current) {
                clearTimeout(tooltipTimeoutRef.current);
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (borderTimeoutRef.current) {
                clearTimeout(borderTimeoutRef.current);
            }
        };
    }, []);

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
        <div className="absolute top-8 right-8 z-50">
            <div className="relative">

                <button
                    onClick={handleGiftsClick}
                    className="group transition-all cursor-pointer duration-300 ease-in-out hover:scale-110 active:scale-95 bg-[#FFE0B2] p-3 w-[50px] h-[50px] gap-[1.5px] flex flex-col justify-center items-center rounded-full hover:shadow-lg"
                >
                    <svg
                        width="47"
                        height="21"
                        viewBox="0 0 47 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-700 ease-in-out origin-bottom group-hover:rotate-[30deg] group-hover:scale-105 ${isLidOpen ? 'rotate-[30deg] scale-105' : 'rotate-0 scale-100'
                            }`}
                    >
                        <path d="M17.2191 9.39984e-05C13.1814 -0.0228257 9.25046 4.14857 11.045 9.32843H4.27273C3.13953 9.32843 2.05275 9.81138 1.25146 10.671C0.450166 11.5307 0 12.6966 0 13.9124L0 18.4963C0 19.1042 0.225087 19.6872 0.625732 20.117C1.02638 20.5468 1.56977 20.7883 2.13637 20.7883H21.3636V13.9124H25.6364V20.7883H44.8636C45.4302 20.7883 45.9736 20.5468 46.3743 20.117C46.7749 19.6872 47 19.1042 47 18.4963V13.9124C47 12.6966 46.5498 11.5307 45.7486 10.671C44.9473 9.81138 43.8605 9.32843 42.7273 9.32843H35.955C38.4545 1.83367 29.0545 -3.46079 24.7177 3.00258L23.5 4.74448L22.2823 2.95674C20.9364 0.916884 19.0777 0.0230137 17.2191 9.39984e-05ZM17.0909 4.74448C18.9923 4.74448 19.9536 7.21981 18.6077 8.66375C17.2618 10.1077 14.9546 9.07631 14.9546 7.03645C14.9546 6.42858 15.1796 5.84561 15.5803 5.41578C15.9809 4.98596 16.5243 4.74448 17.0909 4.74448ZM29.9091 4.74448C31.8105 4.74448 32.7718 7.21981 31.4259 8.66375C30.08 10.1077 27.7727 9.07631 27.7727 7.03645C27.7727 6.42858 27.9978 5.84561 28.3985 5.41578C28.7991 4.98596 29.3425 4.74448 29.9091 4.74448Z" fill="black" />
                    </svg>

                    <svg width="47" height="21" viewBox="0 0 43 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0L0 18.3358C0 19.5515 0.450161 20.7175 1.25145 21.5771C2.05274 22.4368 3.13953 22.9197 4.27273 22.9197H38.4545C39.5877 22.9197 40.6745 22.4368 41.4758 21.5771C42.2771 20.7175 42.7273 19.5515 42.7273 18.3358V0L23.5 0V18.3358H19.2273V0L0 0Z" fill="black" />
                    </svg>
                </button>

                {/* Beautiful Glass Modal Tooltip */}
                {showTooltip && (
                    <div className={`absolute top-14 -right-1.5 mr-3 z-50 transition-all duration-300 ease-in-out ${isClosing ? 'animate-fade-out opacity-0 scale-95' : 'animate-fade-in opacity-100 scale-100'
                        }`}>
                        {/* Glass arrow pointing to the Gifts icon */}
                        <svg width="151" height="54" viewBox="0 0 151 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <foreignObject x="-4" y="-8" width="159" height="61.3613"><div style={{ backdropFilter: 'blur(0px)', clipPath: 'url(#bgblur_0_1125_3687_clip_path)', height: '100%', width: '100%' }}></div></foreignObject><g filter="url(#filter0_d_1125_3687)" data-figma-bg-blur-radius="8">
                                <path d="M130.195 1.1377C130.92 -0.379166 133.08 -0.379167 133.805 1.1377L139.168 12.3652C143.509 12.4547 147 15.9992 147 20.3613V37.3613C147 41.7795 143.418 45.3613 139 45.3613H12C7.58181 45.3613 4.00014 41.7795 4 37.3613V20.3613C4 15.9431 7.58172 12.3613 12 12.3613H124.833L130.195 1.1377Z" fill="#F2F2F2" fillOpacity="0.25" shapeRendering="crispEdges" />
                            </g>
                            {/* Animated border line */}
                            <path 
                                d="M130.195 1.1377C130.92 -0.379166 133.08 -0.379167 133.805 1.1377L139.168 12.3652C143.509 12.4547 147 15.9992 147 20.3613V37.3613C147 41.7795 143.418 45.3613 139 45.3613H12C7.58181 45.3613 4.00014 41.7795 4 37.3613V20.3613C4 15.9431 7.58172 12.3613 12 12.3613H124.833L130.195 1.1377Z" 
                                fill="none" 
                                stroke="#FFE0B2" 
                                strokeWidth="1" 
                                strokeDasharray={`${borderProgress * 3} 300`}
                                strokeDashoffset="0"
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dasharray 0.03s ease-out' }}
                            />
                            {/* Text content with typing animation */}
                            <foreignObject x="20" y="20" width="110" height="20">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFE0B2', fontFamily: 'Anton', fontSize: '12px' }}>
                                    <span>{displayedText}{isTyping && <span className="animate-pulse">|</span>}</span>
                                    <svg className='ml-1' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0913 12.7274C12.3534 12.7274 12.6027 12.638 12.8136 12.4846V14.7217C12.8136 15.4311 12.2447 16 11.5351 16H1.30718C0.968103 16 0.642913 15.8653 0.403149 15.6256C0.163385 15.3858 0.0286865 15.0607 0.0286865 14.7217V8.96912H5.23855L5.78191 9.2887V14.7217H7.06041V10.0237L11.452 12.5549C11.6438 12.6699 11.8548 12.7274 12.0913 12.7274Z" fill="#FFE0B2"/>
<path d="M7.49459 2.48392C6.44367 1.89548 4.81559 2.41757 4.53693 4.02888L2.76872 3.05196C2.47285 2.8885 2.11943 2.85782 1.78621 2.96668C1.45299 3.07555 1.16726 3.31503 0.991886 3.63246L0.33064 4.82931C0.242954 4.98802 0.217628 5.1727 0.260231 5.34272C0.302834 5.51274 0.409878 5.65417 0.557814 5.73591L5.57797 8.50949L6.56984 6.71422L7.68543 7.33057L6.69356 9.12584L11.7137 11.8994C11.8617 11.9812 12.0384 11.9965 12.205 11.9421C12.3716 11.8876 12.5144 11.7679 12.6021 11.6092L13.2634 10.4123C13.4388 10.0949 13.4894 9.72554 13.4042 9.3855C13.319 9.04546 13.1049 8.76259 12.809 8.59912L11.0408 7.62221C12.7746 6.02593 11.084 3.28759 9.01934 4.34955L8.45012 4.62869L8.39006 3.98626C8.33291 3.25952 7.97657 2.75802 7.49459 2.48392ZM6.77674 3.70417C7.27317 3.97844 7.16711 4.76342 6.60741 4.94628C6.0477 5.12913 5.59407 4.52701 5.88832 3.99442C5.97601 3.83571 6.11887 3.71596 6.28548 3.66153C6.45209 3.6071 6.6288 3.62243 6.77674 3.70417ZM10.1235 5.55322C10.6199 5.8275 10.5139 6.61247 9.95418 6.79533C9.39447 6.97819 8.94083 6.37607 9.23509 5.84347C9.32278 5.68476 9.46564 5.56502 9.63225 5.51058C9.79886 5.45615 9.97557 5.47149 10.1235 5.55322Z" fill="#FFE0B2"/>
</svg>

                                </div>
                            </foreignObject>
                            <defs>
                                <filter id="filter0_d_1125_3687" x="-4" y="-8" width="159" height="61.3613" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1125_3687" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1125_3687" result="shape" />
                                </filter>
                                <clipPath id="bgblur_0_1125_3687_clip_path" transform="translate(4 8)"><path d="M130.195 1.1377C130.92 -0.379166 133.08 -0.379167 133.805 1.1377L139.168 12.3652C143.509 12.4547 147 15.9992 147 20.3613V37.3613C147 41.7795 143.418 45.3613 139 45.3613H12C7.58181 45.3613 4.00014 41.7795 4 37.3613V20.3613C4 15.9431 7.58172 12.3613 12 12.3613H124.833L130.195 1.1377Z" />
                                </clipPath></defs>
                        </svg>



                    </div>
                )}
            </div>

            {/* Modal */}
            <GiftsModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Gifts;
