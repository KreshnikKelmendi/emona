"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GiftsModal from './GiftsModal';

const Gifts = () => {
    const [isLidOpen, setIsLidOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [borderProgress, setBorderProgress] = useState(0);
    const [isOpening, setIsOpening] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
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
            setIsLidOpen(false);
            setIsOpening(false);
            setShowSparkles(false);
        } else {
            // Surprize animation sequence
            setIsOpening(true);
            setShowSparkles(true);
            
            // Animate lid opening with bounce
            setIsLidOpen(true);
            
            // Show sparkles for 1 second
            setTimeout(() => {
                setShowSparkles(false);
            }, 1000);
            
            // Open modal after short delay for dramatic effect
            setTimeout(() => {
                setIsModalOpen(true);
                setIsOpening(false);
            }, 300);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsLidOpen(false);
        setIsOpening(false);
        setShowSparkles(false);
    };

    return (
        <div className="absolute top-8 right-8 z-50">
            <div className="relative flex items-center justify-center">
                {/* Glowing pulsing circle behind */}
                <motion.div
                    onClick={handleGiftsClick}
                    className="absolute rounded-full"
                    style={{
                        width: '54px',
                        height: '54px',
                        background: 'radial-gradient(circle, rgba(255, 224, 178, 0.6) 0%, rgba(255, 224, 178, 0) 70%)',
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Rotating circular border - closer to button */}
                <motion.div
                    className="absolute"
                    style={{
                        width: '54px',
                        height: '54px',
                    }}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <svg
                        width="54"
                        height="54"
                        viewBox="0 0 54 54"
                        className="absolute top-0 left-0"
                    >
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <circle
                            cx="27"
                            cy="27"
                            r="25"
                            fill="none"
                            stroke="#FFE0B2"
                            strokeWidth="2"
                            strokeDasharray="8 5"
                            strokeLinecap="round"
                            filter="url(#glow)"
                        />
                    </svg>
                </motion.div>

                {/* Sparkles animation */}
                {showSparkles && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-[#FFE0B2] rounded-full"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                }}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    scale: 0,
                                    opacity: 1,
                                }}
                                animate={{
                                    x: [
                                        Math.cos((i * 30) * Math.PI / 180) * 30,
                                        Math.cos((i * 30) * Math.PI / 180) * 60,
                                    ],
                                    y: [
                                        Math.sin((i * 30) * Math.PI / 180) * 30,
                                        Math.sin((i * 30) * Math.PI / 180) * 60,
                                    ],
                                    scale: [0, 1, 0],
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: 'easeOut',
                                    delay: i * 0.03,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Glow burst effect */}
                {isOpening && (
                    <motion.div
                        className="absolute rounded-full z-5 pointer-events-none"
                        style={{
                            width: '50px',
                            height: '50px',
                            background: 'radial-gradient(circle, rgba(255, 224, 178, 0.8) 0%, rgba(255, 224, 178, 0) 70%)',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{
                            scale: 1,
                            opacity: 1,
                        }}
                        animate={{
                            scale: [1, 2, 2.5],
                            opacity: [1, 0.8, 0],
                        }}
                        transition={{
                            duration: 0.4,
                            ease: 'easeOut',
                        }}
                    />
                )}

                <motion.button
                    onClick={handleGiftsClick}
                    className="group relative cursor-pointer bg-[#FFE0B2] p-3 w-[50px] h-[50px] gap-[1.5px] flex flex-col justify-center items-center rounded-full z-10"
                    style={{
                        filter: 'drop-shadow(0 0 12px rgba(255, 224, 178, 0.9))',
                        boxShadow: '0 0 20px rgba(255, 224, 178, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.4)',
                    }}
                    whileHover={{
                        scale: 1.1,
                        filter: 'drop-shadow(0 0 18px rgba(255, 224, 178, 1))',
                        boxShadow: '0 0 25px rgba(255, 224, 178, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.5)',
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    animate={{
                        scale: isOpening ? [1, 1.2, 1.1] : 1,
                        rotate: isOpening ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{
                        type: isOpening ? 'tween' : 'spring',
                        duration: isOpening ? 0.4 : undefined,
                        ease: isOpening ? [0.68, -0.55, 0.265, 1.55] : undefined,
                        stiffness: isOpening ? undefined : 400,
                        damping: isOpening ? undefined : 25,
                    }}
                >
                    <motion.svg
                        width="47"
                        height="21"
                        viewBox="0 0 47 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{
                            rotate: isLidOpen ? [0, 35, 30] : 0,
                            scale: isLidOpen ? [1, 1.2, 1.05] : 1,
                            y: isOpening ? [0, -3, 0] : 0,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.68, -0.55, 0.265, 1.55],
                        }}
                        style={{
                            originY: 'bottom',
                        }}
                    >
                        <path d="M17.2191 9.39984e-05C13.1814 -0.0228257 9.25046 4.14857 11.045 9.32843H4.27273C3.13953 9.32843 2.05275 9.81138 1.25146 10.671C0.450166 11.5307 0 12.6966 0 13.9124L0 18.4963C0 19.1042 0.225087 19.6872 0.625732 20.117C1.02638 20.5468 1.56977 20.7883 2.13637 20.7883H21.3636V13.9124H25.6364V20.7883H44.8636C45.4302 20.7883 45.9736 20.5468 46.3743 20.117C46.7749 19.6872 47 19.1042 47 18.4963V13.9124C47 12.6966 46.5498 11.5307 45.7486 10.671C44.9473 9.81138 43.8605 9.32843 42.7273 9.32843H35.955C38.4545 1.83367 29.0545 -3.46079 24.7177 3.00258L23.5 4.74448L22.2823 2.95674C20.9364 0.916884 19.0777 0.0230137 17.2191 9.39984e-05ZM17.0909 4.74448C18.9923 4.74448 19.9536 7.21981 18.6077 8.66375C17.2618 10.1077 14.9546 9.07631 14.9546 7.03645C14.9546 6.42858 15.1796 5.84561 15.5803 5.41578C15.9809 4.98596 16.5243 4.74448 17.0909 4.74448ZM29.9091 4.74448C31.8105 4.74448 32.7718 7.21981 31.4259 8.66375C30.08 10.1077 27.7727 9.07631 27.7727 7.03645C27.7727 6.42858 27.9978 5.84561 28.3985 5.41578C28.7991 4.98596 29.3425 4.74448 29.9091 4.74448Z" fill="black" />
                    </motion.svg>

                    <motion.svg 
                        width="47" 
                        height="21" 
                        viewBox="0 0 43 23" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{
                            scale: isOpening ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                        }}
                    >
                        <path d="M0 0L0 18.3358C0 19.5515 0.450161 20.7175 1.25145 21.5771C2.05274 22.4368 3.13953 22.9197 4.27273 22.9197H38.4545C39.5877 22.9197 40.6745 22.4368 41.4758 21.5771C42.2771 20.7175 42.7273 19.5515 42.7273 18.3358V0L23.5 0V18.3358H19.2273V0L0 0Z" fill="black" />
                    </motion.svg>
                </motion.button>

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
                                        <path d="M12.0913 12.7274C12.3534 12.7274 12.6027 12.638 12.8136 12.4846V14.7217C12.8136 15.4311 12.2447 16 11.5351 16H1.30718C0.968103 16 0.642913 15.8653 0.403149 15.6256C0.163385 15.3858 0.0286865 15.0607 0.0286865 14.7217V8.96912H5.23855L5.78191 9.2887V14.7217H7.06041V10.0237L11.452 12.5549C11.6438 12.6699 11.8548 12.7274 12.0913 12.7274Z" fill="#FFE0B2" />
                                        <path d="M7.49459 2.48392C6.44367 1.89548 4.81559 2.41757 4.53693 4.02888L2.76872 3.05196C2.47285 2.8885 2.11943 2.85782 1.78621 2.96668C1.45299 3.07555 1.16726 3.31503 0.991886 3.63246L0.33064 4.82931C0.242954 4.98802 0.217628 5.1727 0.260231 5.34272C0.302834 5.51274 0.409878 5.65417 0.557814 5.73591L5.57797 8.50949L6.56984 6.71422L7.68543 7.33057L6.69356 9.12584L11.7137 11.8994C11.8617 11.9812 12.0384 11.9965 12.205 11.9421C12.3716 11.8876 12.5144 11.7679 12.6021 11.6092L13.2634 10.4123C13.4388 10.0949 13.4894 9.72554 13.4042 9.3855C13.319 9.04546 13.1049 8.76259 12.809 8.59912L11.0408 7.62221C12.7746 6.02593 11.084 3.28759 9.01934 4.34955L8.45012 4.62869L8.39006 3.98626C8.33291 3.25952 7.97657 2.75802 7.49459 2.48392ZM6.77674 3.70417C7.27317 3.97844 7.16711 4.76342 6.60741 4.94628C6.0477 5.12913 5.59407 4.52701 5.88832 3.99442C5.97601 3.83571 6.11887 3.71596 6.28548 3.66153C6.45209 3.6071 6.6288 3.62243 6.77674 3.70417ZM10.1235 5.55322C10.6199 5.8275 10.5139 6.61247 9.95418 6.79533C9.39447 6.97819 8.94083 6.37607 9.23509 5.84347C9.32278 5.68476 9.46564 5.56502 9.63225 5.51058C9.79886 5.45615 9.97557 5.47149 10.1235 5.55322Z" fill="#FFE0B2" />
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
            {isModalOpen && <GiftsModal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    );
};

export default Gifts;
