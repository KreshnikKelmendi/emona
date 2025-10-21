"use client";

import { useState, useEffect } from "react";
import CajiZemresLogo from "../SvgIcons/CajiZemresLogo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show logo after a short delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Complete loading after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#D0020B]">
      {/* Background SVG */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1218 1218" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-posh-spin w-full h-full max-w-none max-h-none">
          <path style={{mixBlendMode: 'normal'}} opacity="0.4" d="M609 0L611.656 561.711L677.186 3.82936L616.934 562.306L744.515 15.2688L622.112 563.488L810.14 34.1748L627.125 565.242L873.235 60.3099L631.91 567.546L933.008 93.345L636.408 570.372L988.705 132.865L640.56 573.684L1039.63 178.372L644.316 577.44L1085.14 229.295L647.628 581.592L1124.66 284.992L650.453 586.089L1157.69 344.765L652.758 590.875L1183.82 407.86L654.512 595.888L1202.73 473.485L655.694 601.066L1214.17 540.814L656.289 606.344L1218 609L656.289 611.656L1214.17 677.186L655.694 616.934L1202.73 744.515L654.512 622.112L1183.82 810.14L652.758 627.125L1157.69 873.235L650.453 631.91L1124.66 933.008L647.628 636.408L1085.14 988.705L644.316 640.56L1039.63 1039.63L640.56 644.316L988.705 1085.14L636.408 647.628L933.008 1124.65L631.91 650.453L873.235 1157.69L627.125 652.758L810.14 1183.82L622.112 654.512L744.515 1202.73L616.934 655.694L677.186 1214.17L611.656 656.289L609 1218L606.344 656.289L540.813 1214.17L601.066 655.694L473.485 1202.73L595.888 654.512L407.86 1183.82L590.875 652.758L344.765 1157.69L586.09 650.453L284.992 1124.65L581.592 647.628L229.295 1085.14L577.44 644.316L178.372 1039.63L573.684 640.56L132.864 988.705L570.372 636.408L93.3448 933.008L567.546 631.91L60.3098 873.235L565.242 627.125L34.1751 810.14L563.488 622.112L15.2688 744.515L562.306 616.934L3.82909 677.186L561.711 611.656L0 609L561.711 606.344L3.82909 540.814L562.306 601.066L15.2688 473.485L563.488 595.888L34.1751 407.86L565.242 590.875L60.3098 344.765L567.546 586.089L93.3448 284.992L570.372 581.592L132.864 229.295L573.684 577.44L178.372 178.372L577.44 573.684L229.295 132.865L581.592 570.372L284.992 93.345L586.09 567.546L344.765 60.3099L590.875 565.242L407.86 34.1748L595.888 563.488L473.485 15.2688L601.066 562.306L540.813 3.82936L606.344 561.711L609 0Z" fill="url(#paint0_radial_1011_3479)"/>
          <defs>
            <radialGradient id="paint0_radial_1011_3479" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(609 609) scale(609)">
              <stop offset="0.0226675" stopColor="#FFEBCA"/>
              <stop offset="0.127899" stopColor="#FEE8C3"/>
              <stop offset="0.271538" stopColor="#FEE1B2"/>
              <stop offset="0.436658" stopColor="#FED695"/>
              <stop offset="0.508231" stopColor="#FED187"/>
              <stop offset="0.647531" stopColor="#FCC879" stopOpacity="0.686827"/>
              <stop offset="0.820634" stopColor="#FABE69" stopOpacity="0.320565"/>
              <stop offset="0.942096" stopColor="#F9B85E" stopOpacity="0.0895439"/>
              <stop offset="1" stopColor="#F9B65B" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo */}
      <div
        className={`transform transition-all duration-1000 ease-out relative z-10 ${
          isVisible 
            ? "scale-100 opacity-100" 
            : "scale-90 opacity-0"
        }`}
      >
        <div className="relative">
            <CajiZemresLogo />
        </div>
      </div>

      <style jsx>{`
        @keyframes posh-spin {
          0% {
            transform: rotate(0deg) scale(1.8);
            opacity: 0.3;
          }
          25% {
            transform: rotate(90deg) scale(2.2);
            opacity: 0.4;
          }
          50% {
            transform: rotate(180deg) scale(2.6);
            opacity: 0.5;
          }
          75% {
            transform: rotate(270deg) scale(2.2);
            opacity: 0.4;
          }
          100% {
            transform: rotate(360deg) scale(1.8);
            opacity: 0.3;
          }
        }

        @keyframes posh-pulse {
          0%, 100% {
            filter: brightness(1) contrast(1) saturate(1);
          }
          50% {
            filter: brightness(1.2) contrast(1.1) saturate(1.3);
          }
        }
        
        .animate-posh-spin {
          animation: posh-spin 20s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite,
                     posh-pulse 10s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}
