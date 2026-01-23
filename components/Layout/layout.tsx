"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import { SideBar } from "../SideBar/SideBar";
import { NavBar } from "../NavBar/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAiChatPage = pathname === "/ai-assistant";

  return (
    <div className={`${isAiChatPage ? "h-screen overflow-hidden" : "min-h-screen"} bg-[#f5f6f6]  flex p-4`}>
      {/* Sidebar - fixed width, grayish background */}
      <div className="w-[280px] flex-shrink-0 h-full overflow-y-auto scroll-hidden ">
        <Suspense fallback={<div className="w-full h-full bg-white rounded-2xl border border-gray-200" />}>
          <SideBar />
        </Suspense>
      </div>

      {/* Main Content Area - takes remaining width with bluish gradient */}
      <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden ${isAiChatPage ? "min-h-0" : ""} ml-4 border border-gray-200 bg-gradient-to-r from-white via-[#f8fbff] to-[#eef4fa] min-w-0`}>
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <div className={`flex-1 ${isAiChatPage ? "overflow-hidden min-h-0" : "overflow-y-auto"} pt-6 pb-2 px-6`}>
          {children}
        </div>
      </div>
    </div>
  );
}