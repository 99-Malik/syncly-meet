"use client";

import React from "react";
import { createPortal } from "react-dom";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
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

        {/* Trash Icon */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="relative">
            {/* Outer light red/pink ring */}
            <div className="w-24 h-24 rounded-full bg-[#FEE2E2] flex items-center justify-center">
              {/* Inner solid red circle */}
              <div className="w-20 h-20 rounded-full bg-[#EF4444] flex items-center justify-center">
                {/* Trash can icon */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Lid */}
                  <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Body with three vertical lines */}
                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Vertical lines inside */}
                  <path d="M9 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Question */}
        <h2 className="text-2xl font-bold text-[#171717] text-center mb-4 font-hyperspace">
          Do you want to Delete Account?
        </h2>

        {/* Description Text */}
        <p className="text-[#727A90] text-center mb-8 font-degular text-sm leading-relaxed px-4">
          It will delete all your account details from this device and it will autologout session from your device
        </p>

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
          {/* Delete Button */}
          <button
            onClick={handleConfirm}
            className="bg-[#EF4444] text-white font-medium rounded-xl transition-colors px-6 py-3 font-degular hover:bg-[#dc2626]"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px'
            }}
          >
            Yes Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
