"use client";

import React from 'react'
import DashboardLayout from '../Layout/layout'
import { Header } from '../Dashboard/Header'
import { NotificationCard } from './NotificationCard'
import { LogoIcon } from '../Svgs/Sign-In/Icons'
import { IntegrationCard } from '../Integration/IntegrationCard'
const Home = () => {
    // Google Icon SVG
    const GoogleIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );

    const handleViewAvailability = () => {
        console.log("View Availability clicked");
        // Handle navigation to view availability page
    };

    const handleDisconnect = () => {
        console.log("Disconnect clicked");
        // Handle disconnect action
    };

    return (
        <DashboardLayout>
            <Header title="Notifications" breadcrumb="Notifications / Home" />

            <div className="mt-6 space-y-4">
                {/* Meeting Notification - Without View Availability Button */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 space-y-4">
                    <p className="text-[#171717] font-hyperspace mb-4" style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '28px'
                    }}>
                        All Notifications
                    </p>
                    <NotificationCard
                        icon={<LogoIcon width={24} height={24} />}
                        title="New meet is scheduled"
                        type="meeting"
                        meetingTitle="Sync meet"
                        meetingDateTime="24 jun 12:00 am - 01:00 pm"
                        meetingDescription="Developer Group, includes all the front end developers in this group"
                        attendeeCount={20}
                        memberAvatars={[
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                        ]}
                        extraMembers={16}
                    />

                    {/* Group Notification - With View Availability Button */}
                    <NotificationCard
                        icon={<LogoIcon width={24} height={24} />}
                        title="New Group created successfully!"
                        type="group"
                        groupName="AI Testing Group"
                        groupDescription="Developer Group, includes all the front end developers in this group"
                        groupInitials="AI"
                        groupBgColor="#FEF9E7"
                        memberCount={40}
                        memberAvatars={[
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                        ]}
                        extraMembers={36}
                        showViewAvailability={true}
                        onViewAvailability={handleViewAvailability}
                    />

                    {/* Account Notification */}
                    <IntegrationCard
                        icon={<GoogleIcon />}
                        title="Google account"
                        email="www.user123@gmail.com"
                        onDisconnect={handleDisconnect}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home