"use client";

import React from "react";
import { createPortal } from "react-dom";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#171717] hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Logout Icon */}
        <div className="flex justify-center mb-6 mt-4">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="90" height="90" rx="45" fill="#EA4949" />
            <rect x="5" y="5" width="90" height="90" rx="45" stroke="#FCE8E8" stroke-width="10" />
            <path d="M56.9998 43.0008H49.9998V38.0008C50 37.8029 49.9414 37.6094 49.8315 37.4448C49.7217 37.2802 49.5654 37.1519 49.3826 37.0762C49.1998 37.0004 48.9986 36.9806 48.8045 37.0193C48.6104 37.0579 48.4322 37.1533 48.2923 37.2933L36.2923 49.2933C36.1993 49.3862 36.1256 49.4965 36.0753 49.6178C36.0249 49.7392 35.999 49.8694 35.999 50.0008C35.999 50.1322 36.0249 50.2623 36.0753 50.3837C36.1256 50.5051 36.1993 50.6154 36.2923 50.7083L48.2923 62.7083C48.4322 62.8483 48.6104 62.9437 48.8045 62.9823C48.9986 63.021 49.1998 63.0012 49.3826 62.9254C49.5654 62.8497 49.7217 62.7214 49.8315 62.5568C49.9414 62.3922 50 62.1987 49.9998 62.0008V57.0008H56.9998C57.265 57.0008 57.5194 56.8954 57.7069 56.7079C57.8945 56.5204 57.9998 56.266 57.9998 56.0008V44.0008C57.9998 43.7356 57.8945 43.4812 57.7069 43.2937C57.5194 43.1061 57.265 43.0008 56.9998 43.0008ZM55.9998 55.0008H48.9998C48.7346 55.0008 48.4802 55.1061 48.2927 55.2937C48.1052 55.4812 47.9998 55.7356 47.9998 56.0008V59.587L38.4136 50.0008L47.9998 40.4145V44.0008C47.9998 44.266 48.1052 44.5204 48.2927 44.7079C48.4802 44.8954 48.7346 45.0008 48.9998 45.0008H55.9998V55.0008ZM61.9998 44.0008V56.0008C61.9998 56.266 61.8945 56.5204 61.7069 56.7079C61.5194 56.8954 61.265 57.0008 60.9998 57.0008C60.7346 57.0008 60.4802 56.8954 60.2927 56.7079C60.1052 56.5204 59.9998 56.266 59.9998 56.0008V44.0008C59.9998 43.7356 60.1052 43.4812 60.2927 43.2937C60.4802 43.1061 60.7346 43.0008 60.9998 43.0008C61.265 43.0008 61.5194 43.1061 61.7069 43.2937C61.8945 43.4812 61.9998 43.7356 61.9998 44.0008Z" fill="white" />
          </svg>


        </div>

        {/* Main Question */}
        <h2 className="text-2xl font-bold text-[#171717] text-center mb-4 font-hyperspace">
          Want to Logout?        </h2>

        {/* Description Text */}
        <p className="text-[#727A90] text-center mb-8 font-degular text-sm leading-relaxed px-4">
          Do you really want to logout your session from this device?        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="bg-[#0F1113] text-white font-medium rounded-xl transition-colors px-6 py-3 font-degular hover:bg-gray-800"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px'
            }}
          >
            No , Cancel
          </button>
          {/* Logout Button */}
          <button
            onClick={handleConfirm}
            className="bg-[#EF4444] text-white font-medium rounded-xl transition-colors px-6 py-3 font-degular hover:bg-[#dc2626]"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px'
            }}
          >
            Yes Logout
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
