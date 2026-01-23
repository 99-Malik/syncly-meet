"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BottomIcons } from "../Svgs/SideBar/Icons";
import { LogoIcon } from "../Svgs/Sign-In/Icons";
import { LogoutModal } from "./LogoutModal";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps & { matchPrefix?: boolean; sourceCheck?: string }> = ({ icon, label, href, matchPrefix = false, sourceCheck }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  
  let isActive: boolean;
  
  // If source parameter exists and this item has a sourceCheck
  if (source && sourceCheck) {
    // Only active if source matches this item's sourceCheck
    isActive = source === sourceCheck;
  } else {
    // No source parameter or this item doesn't have sourceCheck, use normal pathname matching
    if (matchPrefix) {
      isActive = pathname.startsWith(href);
    } else {
      isActive = pathname === href;
    }
  }
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
        ? "bg-[#389BCB] text-white"
        : "text-[#171717] hover:bg-gray-100"
        }`}
    >
      <span className={`shrink-0 ${isActive ? "[&_svg_path]:fill-white [&_svg_g_path]:fill-white [&_svg_rect]:fill-white [&_svg_g_rect]:fill-white" : ""}`}>{icon}</span>
      <span className={isActive ? "font-hyperspace" : "font-degular"} style={{
        fontSize: '14px',
        fontWeight: isActive ? 700 : 400,
        lineHeight: '20px',
        letterSpacing: '0.005em'
      }}>{label}</span>
    </Link>
  );
};

export const SideBar: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div
      className="w-full flex flex-col border rounded-2xl border-gray-200 relative bg-white"
    >
      {/* Logo */}
      <div
        className="p-6 border-b rounded-t-2xl border-gray-200"
        style={{
          background: 'linear-gradient(to left, #FAFCFD 0%, #FFFFFF 40%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LogoIcon width={32} height={32} />
            <span className="text-xl font-bold text-[#171717] font-hyperspace">Syncmeetly</span>
          </div>
          {/* Back Arrow Button */}
          <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" fill="#F8F8FC" />
              <rect x="0.5" y="0.5" width="31" height="31" rx="9.5" stroke="#E5E7EB" />
              <path d="M16.86 20.3933L13.14 16.6667C13.0159 16.5418 12.9462 16.3728 12.9462 16.1967C12.9462 16.0205 13.0159 15.8516 13.14 15.7267L16.86 12C16.9533 11.906 17.0724 11.8419 17.2022 11.8158C17.3321 11.7898 17.4667 11.803 17.589 11.8538C17.7113 11.9045 17.8157 11.9906 17.8889 12.1009C17.9621 12.2113 18.0008 12.3409 18 12.4733V19.92C18.0008 20.0524 17.9621 20.1821 17.8889 20.2924C17.8157 20.4028 17.7113 20.4888 17.589 20.5396C17.4667 20.5904 17.3321 20.6036 17.2022 20.5775C17.0724 20.5515 16.9533 20.4874 16.86 20.3933Z" fill="#727A90" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-4 flex-1">
        <div>
          <p className="text-[#727A90] uppercase mb-3 px-4 font-degular" style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            MAIN MENU
          </p>
          <div className="space-y-1">
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_16_5465)">
                    <path d="M19 20.9999H5C4.73478 20.9999 4.48043 20.8946 4.29289 20.707C4.10536 20.5195 4 20.2651 4 19.9999V10.9999H1L11.327 1.61192C11.5111 1.4444 11.7511 1.35156 12 1.35156C12.2489 1.35156 12.4889 1.4444 12.673 1.61192L23 10.9999H20V19.9999C20 20.2651 19.8946 20.5195 19.7071 20.707C19.5196 20.8946 19.2652 20.9999 19 20.9999ZM6 18.9999H18V9.15692L12 3.70292L6 9.15692V18.9999ZM8 14.9999H16V16.9999H8V14.9999Z" fill="#8E95A6" />
                  </g>
                  <defs>
                    <clipPath id="clip0_16_5465">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              }
              label="Dashboard"
              href="/dashboard"
              matchPrefix={true}
              sourceCheck="dashboard"
            />
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14.676V14.614C10 12.106 12.016 9.99595 14.753 9.38095C14.389 7.07895 11.959 5.19995 8.9 5.19995C5.58 5.19995 3 7.41295 3 9.97995C3 10.949 3.36 11.88 4.04 12.678C4.072 12.716 4.123 12.772 4.192 12.843C4.7799 13.4472 5.13488 14.24 5.194 15.081C5.90809 14.6681 6.74197 14.5122 7.557 14.639C7.723 14.665 7.859 14.685 7.962 14.699C8.63908 14.7869 9.32518 14.7788 10 14.675V14.676ZM10.457 16.627C9.54728 16.7832 8.61924 16.8017 7.704 16.682C7.5524 16.6614 7.40106 16.6391 7.25 16.615C6.87628 16.5567 6.49398 16.6318 6.17 16.827L4.266 17.975C4.11936 18.0653 3.94764 18.1063 3.776 18.092C3.67219 18.0841 3.57095 18.0559 3.47809 18.0088C3.38522 17.9618 3.30255 17.8969 3.23483 17.8178C3.1671 17.7387 3.11565 17.6471 3.08341 17.5481C3.05118 17.4491 3.03881 17.3447 3.047 17.241L3.197 15.46C3.21569 15.2365 3.18617 15.0117 3.11043 14.8007C3.03469 14.5897 2.9145 14.3975 2.758 14.237C2.67488 14.1522 2.5945 14.0648 2.517 13.975C1.563 12.855 1 11.473 1 9.97895C1 6.23495 4.537 3.19995 8.9 3.19995C12.96 3.19995 16.303 5.82695 16.75 9.20795C20.122 9.36095 22.8 11.723 22.8 14.614C22.8 15.807 22.344 16.91 21.571 17.804C21.52 17.864 21.455 17.934 21.376 18.014C21.2496 18.1412 21.1523 18.2944 21.0909 18.4629C21.0294 18.6314 21.0052 18.8112 21.02 18.99L21.141 20.413C21.1471 20.4964 21.1367 20.5802 21.1103 20.6596C21.084 20.739 21.0422 20.8124 20.9873 20.8756C20.9325 20.9388 20.8657 20.9905 20.7909 21.0278C20.716 21.0651 20.6345 21.0872 20.551 21.093C20.4121 21.1043 20.2731 21.0714 20.154 20.999L18.611 20.082C18.348 19.9263 18.0391 19.8666 17.737 19.913C17.59 19.936 17.467 19.9529 17.369 19.966C17.053 20.006 16.729 20.028 16.4 20.028C13.706 20.028 11.402 18.62 10.457 16.627ZM17.434 17.937C17.9983 17.8501 18.5755 17.91 19.11 18.111C19.2502 17.5438 19.5408 17.0249 19.951 16.609C20.001 16.559 20.038 16.519 20.057 16.497C20.546 15.932 20.8 15.284 20.8 14.614C20.8 12.81 18.897 11.2 16.4 11.2C13.903 11.2 12 12.81 12 14.614C12 16.418 13.903 18.028 16.4 18.028C16.641 18.028 16.88 18.012 17.114 17.982C17.194 17.972 17.302 17.957 17.434 17.936V17.937Z" fill="#8E95A6" />
                </svg>

              }
              label="AI Chat"
              
              href="/ai-assistant"
            />
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9V3H15V1H17V3ZM20 11H4V19H20V11ZM15 5H9V7H7V5H4V9H20V5H17V7H15V5ZM6 13H8V15H6V13ZM11 13H13V15H11V13ZM16 13H18V15H16V13Z" fill="#8E95A6" />
                </svg>

              }
              label="My Meetings"
              href="/meetings"
              matchPrefix={true}
            />
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM13 12H17V14H11V7H13V12Z" fill="#8E95A6" />
                </svg>

              }
              label="Availability"
              href="/availability"
              matchPrefix={true}
            />
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_15_5401)">
                    <path d="M2 22C2 19.8783 2.84285 17.8434 4.34315 16.3431C5.84344 14.8429 7.87827 14 10 14C12.1217 14 14.1566 14.8429 15.6569 16.3431C17.1571 17.8434 18 19.8783 18 22H16C16 20.4087 15.3679 18.8826 14.2426 17.7574C13.1174 16.6321 11.5913 16 10 16C8.4087 16 6.88258 16.6321 5.75736 17.7574C4.63214 18.8826 4 20.4087 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.284 14.703C19.6893 15.3359 20.882 16.3612 21.7186 17.6557C22.5552 18.9502 23.0002 20.4587 23 22H21C21.0002 20.844 20.6666 19.7125 20.0391 18.7416C19.4116 17.7707 18.5171 17.0017 17.463 16.527L18.283 14.703H18.284ZM17.596 3.413C18.6035 3.8283 19.465 4.53354 20.071 5.43923C20.6771 6.34492 21.0004 7.41024 21 8.5C21.0004 9.87233 20.4877 11.1952 19.5625 12.2088C18.6374 13.2224 17.3667 13.8535 16 13.978V11.965C16.7409 11.8589 17.4283 11.518 17.9613 10.9925C18.4943 10.4669 18.8447 9.78432 18.9612 9.04493C19.0776 8.30555 18.954 7.5483 18.6084 6.88435C18.2628 6.22041 17.7134 5.68475 17.041 5.356L17.596 3.413Z" fill="#8E95A6" />
                  </g>
                  <defs>
                    <clipPath id="clip0_15_5401">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              }
              label="Groups"
              href="/groups"
              matchPrefix={true}
              sourceCheck="groups"
            />
          </div>
          
        </div>
        <div className="border-b-2 border-[#E5E7EB] my-3"></div>

        {/* Others Section */}
        <div >
          <p className="text-[#686F83] uppercase mb-3 px-4 font-degular" style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            OTHERS
          </p>
          <div className="space-y-1">
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_15_4713)">
                <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0284 11.6286 18.3231 11.1876 18.5241 10.7023C18.7251 10.217 18.8286 9.69683 18.8286 9.17152C18.8286 8.64622 18.7251 8.12607 18.5241 7.64075C18.3231 7.15544 18.0284 6.71447 17.657 6.34302C17.2856 5.97158 16.8446 5.67694 16.3593 5.47591C15.874 5.27489 15.3538 5.17142 14.8285 5.17142C14.3032 5.17142 13.783 5.27489 13.2977 5.47591C12.8124 5.67694 12.3714 5.97158 12 6.34302L10.586 7.75702L9.17199 6.34302L10.586 4.92902C11.7143 3.81894 13.2356 3.19968 14.8184 3.20612C16.4012 3.21257 17.9174 3.8442 19.0366 4.96343C20.1558 6.08267 20.7874 7.59882 20.7939 9.18164C20.8003 10.7645 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1967 20.0847 11.4669 20.3922C10.737 20.6998 9.95341 20.8598 9.16137 20.863C8.36934 20.8663 7.5845 20.7126 6.85213 20.411C6.11977 20.1094 5.45436 19.6658 4.8943 19.1057C4.33424 18.5457 3.89061 17.8803 3.589 17.1479C3.28739 16.4155 3.13377 15.6307 3.13699 14.8386C3.14022 14.0466 3.30023 13.263 3.60779 12.5332C3.91536 11.8033 4.36439 11.1415 4.92899 10.586L6.34299 9.17202L7.75699 10.586L6.34299 12C5.97155 12.3715 5.6769 12.8124 5.47588 13.2978C5.27486 13.7831 5.17139 14.3032 5.17139 14.8285C5.17139 15.3538 5.27486 15.874 5.47588 16.3593C5.6769 16.8446 5.97155 17.2856 6.34299 17.657C6.71444 18.0285 7.15541 18.3231 7.64072 18.5241C8.12604 18.7252 8.64619 18.8286 9.17149 18.8286C9.69679 18.8286 10.217 18.7252 10.7023 18.5241C11.1876 18.3231 11.6286 18.0285 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.75702L16.243 9.17202L9.17199 16.242L7.75699 14.828L14.828 7.75802V7.75702ZM5.77499 2.29302L7.70699 1.77502L8.74199 5.64002L6.81099 6.15802L5.77499 2.29402V2.29302ZM15.258 18.361L17.189 17.843L18.225 21.707L16.293 22.225L15.258 18.361ZM2.29299 5.77502L6.15699 6.81102L5.63899 8.74202L1.77499 7.70702L2.29299 5.77502ZM18.361 15.258L22.225 16.293L21.707 18.225L17.843 17.189L18.361 15.258Z" fill="#8E95A6"/>
                </g>
                <defs>
                <clipPath id="clip0_15_4713">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              }
              label="Integration"
              href="/integration"
              matchPrefix={true}
              sourceCheck="integration"
            />
            <MenuItem
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_15_6498)">
                <path d="M5 18H19V11.031C19 7.148 15.866 4 12 4C8.134 4 5 7.148 5 11.031V18ZM12 2C16.97 2 21 6.043 21 11.031V20H3V11.031C3 6.043 7.03 2 12 2ZM9.5 21H14.5C14.5 21.663 14.2366 22.2989 13.7678 22.7678C13.2989 23.2366 12.663 23.5 12 23.5C11.337 23.5 10.7011 23.2366 10.2322 22.7678C9.76339 22.2989 9.5 21.663 9.5 21Z" fill="#8E95A6"/>
                </g>
                <defs>
                <clipPath id="clip0_15_6498">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                
              }
              label="Notifications"
              href="/notifications"
            />
          </div>
        </div>
        <div className="border-b-2 border-[#E5E7EB] my-3"></div>

        {/* Promotional Box */}
        <div className="mt-28">  
        <BottomIcons  />
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button 
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#fee2e2] text-[#E51B1B] rounded-2xl transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 11H13V13H5V16L0 12L5 8V11ZM4 18H6.708C7.86269 19.0183 9.28669 19.6819 10.8091 19.9109C12.3316 20.14 13.8878 19.9249 15.291 19.2915C16.6942 18.6581 17.8849 17.6332 18.7201 16.3398C19.5553 15.0465 19.9995 13.5396 19.9995 12C19.9995 10.4604 19.5553 8.95354 18.7201 7.66019C17.8849 6.36683 16.6942 5.34194 15.291 4.7085C13.8878 4.07506 12.3316 3.85998 10.8091 4.08906C9.28669 4.31815 7.86269 4.98167 6.708 6H4C4.93066 4.75718 6.13833 3.74851 7.52707 3.05414C8.91581 2.35978 10.4473 1.99884 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.4473 22.0012 8.91581 21.6402 7.52707 20.9459C6.13833 20.2515 4.93066 19.2428 4 18Z" fill="#E51B1B" />
          </svg>
          <span className="font-degular" style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>Logout</span>
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          // Handle logout here
          console.log("User logged out");
          setShowLogoutModal(false);
        }}
      />
    </div>
  );
};