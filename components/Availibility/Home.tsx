"use client";

import React from "react";
import DashboardLayout from '../Layout/layout';
import { Header } from '../Dashboard/Header';
import { AvailabilityCard } from './AvailabilityCard';

const AvailabilityHome = () => {
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    return (
        <DashboardLayout>
            <Header title="Groups" breadcrumb="Groups / Home" />
            
            {/* Working Hours Section */}
            <div className="mt-6 p-4 bg-white  border border-[#E5E7EB] rounded-2xl ">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[#171717] font-hyperspace" style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: '120%',
                        letterSpacing: '-0.02em'
                    }}>
                        Working Hours
                    </h2>
                    
                    {/* Save Changes Button */}
                    <button
                        className="px-4 py-2.5 bg-[#3eace2] text-white rounded-xl font-degular hover:bg-[#2d9bc7] transition-colors cursor-pointer"
                        style={{
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '24px',
                            letterSpacing: '0.005em'
                        }}
                    >
                        Save Changes
                    </button>
                </div>

                {/* Availability Cards */}
                <div className="space-y-6">
                    {daysOfWeek.map((day) => (
                        <AvailabilityCard key={day} day={day} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AvailabilityHome;
