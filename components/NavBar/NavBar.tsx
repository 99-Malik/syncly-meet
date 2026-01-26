"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogoutModal } from "../SideBar/LogoutModal";

export const NavBar: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <div className="h-18 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0206 11.078L14.876 13.9326L13.9326 14.876L11.078 12.0206C10.0158 12.8721 8.69465 13.3352 7.33331 13.3333C4.02131 13.3333 1.33331 10.6453 1.33331 7.33331C1.33331 4.02131 4.02131 1.33331 7.33331 1.33331C10.6453 1.33331 13.3333 4.02131 13.3333 7.33331C13.3352 8.69465 12.8721 10.0158 12.0206 11.078ZM10.6833 10.5833C11.5294 9.71324 12.0019 8.54693 12 7.33331C12 4.75465 9.91131 2.66665 7.33331 2.66665C4.75465 2.66665 2.66665 4.75465 2.66665 7.33331C2.66665 9.91131 4.75465 12 7.33331 12C8.54693 12.0019 9.71324 11.5294 10.5833 10.6833L10.6833 10.5833Z" fill="#09121F" />
            </svg>

          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-[#171717] placeholder:text-[#686F83] focus:outline-none focus:ring-2 focus:ring-[#3eace2] font-degular"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0.005em'
            }}
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-[#24282E] font-degular" style={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '0.005em'
            }}>
              John Will Palinsky
            </p>
            <p className="text-[#727A90] font-degular" style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '0.005em'
            }}>
              user12@gmail.com
            </p>
          </div>
          <div className="ml-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.80752 6.75H13.1925C13.3409 6.75062 13.4857 6.79521 13.6087 6.87813C13.7316 6.96106 13.8273 7.07859 13.8835 7.21586C13.9397 7.35313 13.9539 7.50399 13.9244 7.64935C13.8948 7.79471 13.8228 7.92804 13.7175 8.0325L9.53253 12.2175C9.4628 12.2878 9.37985 12.3436 9.28846 12.3817C9.19706 12.4197 9.09903 12.4393 9.00002 12.4393C8.90102 12.4393 8.80299 12.4197 8.71159 12.3817C8.6202 12.3436 8.53725 12.2878 8.46752 12.2175L4.28252 8.0325C4.17721 7.92804 4.10523 7.79471 4.07569 7.64935C4.04615 7.50399 4.06038 7.35313 4.11657 7.21586C4.17277 7.07859 4.26841 6.96106 4.39139 6.87813C4.51438 6.79521 4.6592 6.75062 4.80752 6.75Z" fill="#727A90" />
          </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            <a href="#" className="block px-4 py-2 text-sm text-[#171717] hover:bg-gray-100 font-degular">Profile</a>
            <Link href="/settings" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-[#171717] hover:bg-gray-100 font-degular">Settings</Link>
            <button
              onClick={() => {
                setShowUserMenu(false);
                setShowLogoutModal(true);
              }}
              className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-degular"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          // Handle logout logic here (e.g., clear session, redirect to login)
          console.log("User logged out");
          // You can add redirect logic here:
          // window.location.href = "/login";
          setShowLogoutModal(false);
        }}
      />
    </div>
  );
};
