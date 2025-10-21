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

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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
      } else {
        console.error('Form submission failed:', result.message || 'Failed to submit form. Please try again.');
      }
    } catch {
      console.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
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
            <div className="absolute font-bwseidoround-thin left-3 top-1/2 transform -translate-y-1/2 text-[#EBA486] text-base">
              +383
            </div>
            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-px h-6 bg-[#EBA486]"></div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full text-base text-white font-bwseidoround-thin pl-20 pr-3 px-3 h-[56px] bg-black/20 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#FCC879] placeholder:text-[#EBA486]"
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
