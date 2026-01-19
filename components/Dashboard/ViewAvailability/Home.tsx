"use client";

import React from "react";
import DashboardLayout from '@/components/Layout/layout';
import { Header } from '@/components/Dashboard/Header';
import { Calendar } from './Calendar';
import { Members } from './Members';
import { AvailableSlots } from './AvailableSlots';

const ViewAvailabilityHome = () => {
    // Sample data
    const datesWithEvents = [1, 2, 10, 17, 18, 19, 23];
    
    const members = [
        {
            id: "1",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "2",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "3",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "4",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        {
            id: "5",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "6",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "7",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "8",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        {
            id: "9",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "10",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "11",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "12",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
    ];

    const handleDateSelect = (date: Date) => {
        console.log("Selected date:", date);
    };

    const handleMemberSelect = (memberId: string) => {
        console.log("Selected member:", memberId);
    };

    const handleSlotSelect = (slot: string) => {
        console.log("Selected slot:", slot);
    };

    return (
        <DashboardLayout>
            <Header 
              title="View Availability" 
              breadcrumb="Groups / View Availability" 
              showBackArrow={true}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Column */}
                <div className="lg:col-span-1">
                    <Calendar
                        selectedDate={new Date()}
                        onDateSelect={handleDateSelect}
                        datesWithEvents={datesWithEvents}
                    />
                </div>

                {/* Members Column */}
                <div className="lg:col-span-1">
                    <Members
                        members={members}
                        onMemberSelect={handleMemberSelect}
                    />
                </div>

                {/* Available Slots Column */}
                <div className="lg:col-span-1">
                    <AvailableSlots
                        onSlotSelect={handleSlotSelect}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewAvailabilityHome;