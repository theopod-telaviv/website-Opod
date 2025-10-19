"use client";

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "972585950580"; // +972 58-595-0580
  const message = encodeURIComponent("Hello! I would like to know more about The O Pod Hotel.");

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip text that appears on hover */}
        <div
          className={`absolute right-full mr-3 whitespace-nowrap bg-[#1C1C1C] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          Chat with us!
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#1C1C1C] rotate-45" />
        </div>

        {/* Button content */}
        <div className="flex items-center justify-center w-14 h-14">
          <MessageCircle className="h-7 w-7" />
        </div>

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </button>
    </div>
  );
}
