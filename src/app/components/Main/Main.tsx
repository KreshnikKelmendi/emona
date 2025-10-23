"use client";

import { useState } from "react";
import Footer from "../Footer/Footer";

interface MainProps {
  onGameJoin: (userName?: string) => void;
}

export default function Main({ onGameJoin }: MainProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    fileUpload: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      fileUpload: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert file to base64 if present
      let fileUploadBase64 = '';
      if (formData.fileUpload) {
        fileUploadBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.fileUpload!);
        });
      }

      // Use phone number exactly as entered by user
      const cleanPhone = formData.phone.trim();

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
          fileUpload: fileUploadBase64 || formData.fileUpload?.name || ''
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Reset form without showing success message
        setFormData({
          fullName: "",
          phone: "",
          fileUpload: null,
        });
        // Trigger success screen with user's name
        onGameJoin(formData.fullName);
      }
      // Note: We don't handle errors in the UI since the form just resets on success
    } catch {
      // Handle network errors silently since we don't show error messages
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
       <div className="w-full lg:hidden absolute top-0 left-0 h-full overflow-hidden pointer-events-none z-[-1]">
            <svg width="100%" height="100%" viewBox="0 0 1218 1218" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-none max-h-none">
            <path style={{ mixBlendMode: 'color-dodge' }} opacity="0.25" d="M609 0L611.656 561.711L677.186 3.82936L616.934 562.306L744.515 15.2688L622.112 563.488L810.14 34.1748L627.125 565.242L873.235 60.3099L631.91 567.546L933.008 93.345L636.408 570.372L988.705 132.865L640.56 573.684L1039.63 178.372L644.316 577.44L1085.14 229.295L647.628 581.592L1124.66 284.992L650.453 586.089L1157.69 344.765L652.758 590.875L1183.82 407.86L654.512 595.888L1202.73 473.485L655.694 601.066L1214.17 540.814L656.289 606.344L1218 609L656.289 611.656L1214.17 677.186L655.694 616.934L1202.73 744.515L654.512 622.112L1183.82 810.14L652.758 627.125L1157.69 873.235L650.453 631.91L1124.66 933.008L647.628 636.408L1085.14 988.705L644.316 640.56L1039.63 1039.63L640.56 644.316L988.705 1085.14L636.408 647.628L933.008 1124.65L631.91 650.453L873.235 1157.69L627.125 652.758L810.14 1183.82L622.112 654.512L744.515 1202.73L616.934 655.694L677.186 1214.17L611.656 656.289L609 1218L606.344 656.289L540.813 1214.17L601.066 655.694L473.485 1202.73L595.888 654.512L407.86 1183.82L590.875 652.758L344.765 1157.69L586.09 650.453L284.992 1124.65L581.592 647.628L229.295 1085.14L577.44 644.316L178.372 1039.63L573.684 640.56L132.864 988.705L570.372 636.408L93.3448 933.008L567.546 631.91L60.3098 873.235L565.242 627.125L34.1751 810.14L563.488 622.112L15.2688 744.515L562.306 616.934L3.82909 677.186L561.711 611.656L0 609L561.711 606.344L3.82909 540.814L562.306 601.066L15.2688 473.485L563.488 595.888L34.1751 407.86L565.242 590.875L60.3098 344.765L567.546 586.089L93.3448 284.992L570.372 581.592L132.864 229.295L573.684 577.44L178.372 178.372L577.44 573.684L229.295 132.865L581.592 570.372L284.992 93.345L586.09 567.546L344.765 60.3099L590.875 565.242L407.86 34.1748L595.888 563.488L473.485 15.2688L601.066 562.306L540.813 3.82936L606.344 561.711L609 0Z" fill="url(#paint0_radial_1011_3479)" />
            <defs>
                <radialGradient id="paint0_radial_1011_3479" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(609 609) scale(609)">
                    <stop offset="0.0226675" stopColor="#FFEBCA" />
                    <stop offset="0.127899" stopColor="#FEE8C3" />
                    <stop offset="0.271538" stopColor="#FEE1B2" />
                    <stop offset="0.436658" stopColor="#FED695" />
                    <stop offset="0.508231" stopColor="#FED187" />
                    <stop offset="0.647531" stopColor="#FCC879" stopOpacity="0.686827" />
                    <stop offset="0.820634" stopColor="#FABE69" stopOpacity="0.320565" />
                    <stop offset="0.942096" stopColor="#F9B85E" stopOpacity="0.0895439" />
                    <stop offset="1" stopColor="#F9B65B" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6 px-4">
        {/* Full Name */}
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-3 h-[56px] text-white bg-black/20 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#FCC879] placeholder:text-[#EBA486] text-base font-bwseidoround-thin"
            placeholder="Emri dhe mbiemri"
            required
          />
        </div>


        {/* Phone */}
        <div>
          <div className="relative">
            
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 h-[56px] text-white bg-black/20 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#FCC879] placeholder:text-[#EBA486] text-base font-bwseidoround-thin"
              placeholder="Nr. i Telefonit"
              required
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <div className="relative">
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required
            />
            <div className="rounded-[8px] p-6 bg-black/20 text-center hover:bg-[#D7CCBD] transition-colors cursor-pointer">
              <div className="flex items-center justify-center">
                <svg 
                  className="h-10 w-10 text-[#EBA486] mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                
                <div className="text-left">
                  <p className="text-base text-[#EBA486] font-bwseidoround">Fotografo Faturën dhe Produktin</p>
                  <p className="text-xs text-[#EBA486] font-bwseidoround-thin">ose Shto prej Albumit</p>
                </div>
              </div>
              
              {formData.fileUpload && (
                <div className="mt-2 p-2 bg-gradient-to-r from-emerald-500/15 to-green-500/15 rounded-[8px] shadow-2xl shadow-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#FCC879]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-anton text-[#FCC879]">
                        Fotografia e zgjedhur
                      </p>
                      <p className="text-xs font-anton text-[#FCC879] truncate">
                        {formData.fileUpload.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full cursor-pointer flex items-center justify-center uppercase font-bwseidoround text-[#280F03] h-[56px] px-4 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500  ${
            isSubmitting 
              ? 'bg-[#FCC879] cursor-not-allowed' 
              : 'bg-[#FCC879] hover:bg-black hover:text-white'
          }`}
        >
          {isSubmitting ? 'Duke u procesuar...' : 'Bëhu pjesë'}
        </button>
        
        <Footer />
      </form>
    </main>
  );
}
