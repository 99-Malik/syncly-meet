"use client";

import React, { useState, useRef } from 'react';
import DashboardLayout from '../Layout/layout';
import { Header } from '../Dashboard/Header';
import { useRouter } from 'next/navigation';
import { PersonIcon, EmailIcon, LockIcon, EyeIcon } from '../Sign-In/Icons';
import { DeleteAccountModal } from './DeleteAccountModal';
import { CustomDropdown } from '../Meetings/CustomDropdown';

const Home = () => {
    const router = useRouter();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [language, setLanguage] = useState('English');
    const [region, setRegion] = useState('Asia, Pakistan');

    const languageOptions = ['English', 'Spanish', 'French', 'German', 'Chinese'];
    const regionOptions = ['Asia, Pakistan', 'North America, USA', 'Europe, UK', 'Europe, Germany', 'Asia, India', 'Asia, China'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setAvatarUrl(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangeButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <DashboardLayout>
            <Header
                title="Settings"
                breadcrumb="Settings / Home"
                showBackArrow={true}
                onBack={() => router.back()}
            />

            <div className="p-4 sm:p-6">
                {/* Main Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB]">
                    {/* Card Header */}
                    <div className="px-4 sm:px-6 lg:px-8 pt-4">
                        <h2 className="text-[#171717] text-lg font-bold font-hyperspace">
                            Availability Details
                        </h2>
                    </div>

                    {/* Profile Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
                            {/* Left Column - Section Info */}
                            <div className="xl:w-[280px] 2xl:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace">
                                    Profile
                                </h2>
                                <p className="text-[#727A90] text-sm leading-relaxed font-degular">
                                    Your personal information and account
                                    security settings.
                                </p>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="flex-1 min-w-0 space-y-6">
                                {/* Avatar Section */}
                                <div>
                                    <label className="block text-[#171717] text-sm mb-3 font-degular">Avatar</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#E5E7EB] flex-shrink-0">
                                            <img
                                                src={avatarUrl}
                                                alt="Profile Avatar"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
                                                }}
                                            />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={handleChangeButtonClick}
                                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0F1113] text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors font-hyperspace"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-[#171717] text-sm mb-3 font-degular">Email</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
                                            <EmailIcon />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Input your email"
                                            className="w-full bg-white text-[#171717] placeholder:text-[#686F83] pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular text-[15px] sm:text-[16px]"
                                        />
                                    </div>
                                </div>

                                {/* Full Name Field */}
                                <div>
                                    <label className="block text-[#171717] text-sm mb-3 font-degular">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
                                            <PersonIcon />
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="e.g, Noam Laish"
                                            className="w-full bg-white text-[#171717] placeholder:text-[#686F83] pl-12 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular text-[15px] sm:text-[16px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>

                    {/* Security Options Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
                            {/* Left Column - Section Info */}
                            <div className="xl:w-[280px] 2xl:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace mb-2">
                                    Security Options
                                </h2>
                                <p className="text-[#727A90] text-sm leading-relaxed font-degular">
                                    Update your password and security logins
                                    here
                                </p>
                            </div>

                            {/* Right Column - Password Fields */}
                            <div className="flex-1 min-w-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Old Password */}
                                    <div className="min-w-0">
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">Old Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
                                                <LockIcon />
                                            </div>
                                            <input
                                                type={showOldPassword ? "text" : "password"}
                                                name="oldPassword"
                                                value={formData.oldPassword}
                                                onChange={handleInputChange}
                                                placeholder="******"
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular text-[15px] sm:text-[16px]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727A90] hover:text-[#171717] transition-colors"
                                            >
                                                <EyeIcon show={showOldPassword} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="min-w-0">
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">New Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
                                                <LockIcon />
                                            </div>
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                placeholder="******"
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular text-[15px] sm:text-[16px]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727A90] hover:text-[#171717] transition-colors"
                                            >
                                                <EyeIcon show={showNewPassword} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">Confirm New Password</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
                                                <LockIcon />
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="******"
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular text-[15px] sm:text-[16px]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727A90] hover:text-[#171717] transition-colors"
                                            >
                                                <EyeIcon show={showConfirmPassword} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>

                    {/* Language & Region Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
                            {/* Left Column - Section Info */}
                            <div className="xl:w-[280px] 2xl:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace mb-2">
                                    Language & Region
                                </h2>
                                <p className="text-[#727A90] text-sm leading-relaxed font-degular">
                                    Customize your language and region.
                                </p>
                            </div>

                            {/* Right Column - Dropdowns */}
                            <div className="flex-1 min-w-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Language Dropdown */}
                                    <div className="min-w-0">
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">Language</label>
                                        <CustomDropdown
                                            value={language}
                                            onChange={setLanguage}
                                            options={languageOptions}
                                        />
                                    </div>

                                    {/* Region Dropdown */}
                                    <div className="min-w-0">
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">Region</label>
                                        <CustomDropdown
                                            value={region}
                                            onChange={setRegion}
                                            options={regionOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>

                    {/* Danger Zone Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center xl:flex-row gap-4 sm:gap-6 lg:gap-8">
                            {/* Left Column - Section Info */}
                            <div className="xl:w-[280px] 2xl:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace mb-1 sm:mb-2">
                                    Danger zone
                                </h2>
                                <p className="text-[#727A90] text-sm font-degular">
                                    Proceed with caution.
                                </p>
                            </div>

                            {/* Right Column - Delete Button */}
                            <div className="flex-1">
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="w-full sm:w-auto px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white text-[14px] font-medium rounded-xl transition-colors font-degular"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    console.log("Account deleted");
                    setShowDeleteModal(false);
                }}
            />
        </DashboardLayout>
    );
};

export default Home;