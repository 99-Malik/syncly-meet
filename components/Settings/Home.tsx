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
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            // Create a URL for the selected file
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

            <div className="p-6">
                {/* Main Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB]">
                    {/* Card Header */}
                    <div className="px-8 pt-4">
                        <h2 className="text-[#171717] text-lg font-bold font-hyperspace">
                            Availability Details
                        </h2>
                    </div>

                    {/* Profile Section */}
                    <div className="px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Section Info */}
                            <div className="lg:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace">
                                    Profile
                                </h2>
                                <p className="text-[#727A90] text-sm leading-relaxed font-degular">
                                    Your personal information and account<br />
                                    security settings.
                                </p>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="flex-1 space-y-6">
                                {/* Avatar Section */}
                                <div>
                                    <label className="block text-[#171717] text-sm mb-3 font-degular">Avatar</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E5E7EB] flex-shrink-0">
                                            <img
                                                src={avatarUrl}
                                                alt="Profile Avatar"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to default avatar if image fails to load
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
                                            className="px-6 py-3 bg-[#0F1113] text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors font-hyperspace"
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
                                            className="w-full bg-white text-[#171717] placeholder:text-[#686F83] pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular"
                                            style={{
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                letterSpacing: '0.005em'
                                            }}
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
                                            className="w-full bg-white text-[#171717] placeholder:text-[#686F83] pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular"
                                            style={{
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                letterSpacing: '0.005em'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-8'>

                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>
                    {/* Security Options Section */}
                    <div className="px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Section Info */}
                            <div className="lg:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace mb-2">
                                    Security Options
                                </h2>
                                <p className="text-[#727A90] text-sm leading-relaxed font-degular">
                                    Update your password and security logins<br />
                                    here
                                </p>
                            </div>

                            {/* Right Column - Password Fields */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Old Password */}
                                    <div>
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
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular"
                                                style={{
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    letterSpacing: '0.005em'
                                                }}
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
                                    <div>
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
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular"
                                                style={{
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    letterSpacing: '0.005em'
                                                }}
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
                                    <div>
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
                                                className="w-full bg-[#F1F2F4] text-[#686F83] placeholder:text-[#686F83] pl-12 pr-12 py-3 rounded-2xl border-2 border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all font-degular"
                                                style={{
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    letterSpacing: '0.005em'
                                                }}
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
                    <div className='px-8'>
                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>

                    {/* Language & Region Section */}
                    <div className="px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Section Info */}
                            <div className="lg:w-[320px] flex-shrink-0">
                                <svg width="165" height="16" viewBox="0 0 165 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.91738e-06 12.96V0.420021H2.40001V10.7H8.80001V12.96H4.91738e-06ZM12.4259 12.96C11.3059 12.96 10.4859 12.32 10.4859 10.96V8.76002C10.4859 7.58002 11.0659 6.56002 12.5459 6.56002H16.8259V5.52002C16.8259 5.08002 16.5259 4.78002 15.9859 4.78002H10.9659V2.62002H16.6259C18.1859 2.62002 18.9859 3.42002 18.9859 4.96002V12.96H16.8259V12.38C16.5659 12.74 16.1059 12.96 15.5859 12.96H12.4259ZM13.2859 10.84H15.9859C16.5259 10.84 16.8059 10.46 16.8059 9.96002V8.58002H13.3259C12.9059 8.58002 12.6459 8.84002 12.6459 9.20002V10.2C12.6459 10.62 12.9059 10.84 13.2859 10.84ZM21.118 12.96V2.66002H23.278V3.36002C23.558 3.06002 23.958 2.62002 24.718 2.62002H27.338C28.778 2.62002 29.598 3.46002 29.598 5.02002V12.96H27.378V5.86002C27.378 5.18002 26.998 4.82002 26.478 4.82002H24.258C23.658 4.82002 23.278 5.22002 23.278 5.88002V12.96H21.118ZM32.2458 15.72V13.82L36.8058 13.8C37.3858 13.8 37.8858 13.46 37.8858 12.74V11.76C37.6858 11.98 37.4458 12.22 36.7458 12.22H33.8058C32.3858 12.22 31.5258 11.46 31.5258 9.90002V5.06002C31.5258 3.52002 32.3658 2.62002 33.9858 2.62002H40.0458V13.24C40.0458 14.84 39.1258 15.72 37.5258 15.72H32.2458ZM34.6858 10.08H36.8458C37.3458 10.08 37.8858 9.68002 37.8858 8.90002V4.80002H34.8058C34.1458 4.80002 33.7058 5.18002 33.7058 5.94002V8.98002C33.7058 9.58002 34.0058 10.08 34.6858 10.08ZM44.4322 12.96C43.0522 12.96 42.1922 12.14 42.1922 10.62V2.62002H44.3722V9.76002C44.3722 10.38 44.8522 10.82 45.4322 10.82H47.4922C47.9922 10.82 48.4922 10.3 48.4922 9.68002V2.62002H50.6922V12.96H48.4922V12.28C48.2722 12.62 47.7522 12.96 47.1522 12.96H44.4322ZM54.7791 12.96C53.6591 12.96 52.8391 12.32 52.8391 10.96V8.76002C52.8391 7.58002 53.4191 6.56002 54.8991 6.56002H59.1791V5.52002C59.1791 5.08002 58.8791 4.78002 58.3391 4.78002H53.3191V2.62002H58.9791C60.5391 2.62002 61.3391 3.42002 61.3391 4.96002V12.96H59.1791V12.38C58.9191 12.74 58.4591 12.96 57.9391 12.96H54.7791ZM55.6391 10.84H58.3391C58.8791 10.84 59.1591 10.46 59.1591 9.96002V8.58002H55.6791C55.2591 8.58002 54.9991 8.84002 54.9991 9.20002V10.2C54.9991 10.62 55.2591 10.84 55.6391 10.84ZM63.9911 15.72V13.82L68.5511 13.8C69.1311 13.8 69.6311 13.46 69.6311 12.74V11.76C69.4311 11.98 69.1911 12.22 68.4911 12.22H65.5511C64.1311 12.22 63.2711 11.46 63.2711 9.90002V5.06002C63.2711 3.52002 64.1111 2.62002 65.7311 2.62002H71.7911V13.24C71.7911 14.84 70.8711 15.72 69.2711 15.72H63.9911ZM66.4311 10.08H68.5911C69.0911 10.08 69.6311 9.68002 69.6311 8.90002V4.80002H66.5511C65.8911 4.80002 65.4511 5.18002 65.4511 5.94002V8.98002C65.4511 9.58002 65.7511 10.08 66.4311 10.08ZM82.4375 8.82002H76.1175V10.02C76.1175 10.5 76.4175 10.82 76.8975 10.82H81.9575V12.96H76.4175C74.7775 12.96 73.9375 12.16 73.9375 10.48V5.16002C73.9375 3.56002 74.8175 2.62002 76.4175 2.62002H79.9575C81.4975 2.62002 82.4375 3.52002 82.4375 5.12002V8.82002ZM76.9575 4.72002C76.4175 4.72002 76.1175 5.08002 76.1175 5.62002V6.74002H80.2575V5.56002C80.2575 5.10002 80.0175 4.72002 79.4575 4.72002H76.9575ZM91.4289 9.02002C91.3689 9.02002 91.3089 9.02002 91.2489 9.04002V11C91.2889 11.02 91.3689 11.02 91.4289 11.02C91.9489 11.02 92.0489 10.64 92.0489 10.02C92.0489 9.38002 91.9489 9.02002 91.4289 9.02002ZM94.4689 9.74002V10.22H93.6689V10.98H94.6089V11.46H93.0889V8.56002H94.6089V9.06002H93.6689V9.74002H94.4689ZM91.3889 11.5C91.2289 11.5 90.9289 11.5 90.6689 11.46V8.60002C90.9289 8.56002 91.2089 8.52002 91.4089 8.52002C92.3089 8.52002 92.6289 9.02002 92.6289 10.02C92.6289 11.04 92.2889 11.5 91.3889 11.5ZM95.1289 8.56002H95.9089L96.2889 10.16L96.6689 8.56002H97.4689C97.5089 9.26002 97.5489 10.52 97.5889 11.46H97.0089C97.0089 10.78 96.9889 10.06 96.9489 9.38002L96.5489 11.02H96.0089L95.6089 9.38002H95.5889C95.5689 10.06 95.5489 10.78 95.5489 11.46H94.9889C95.0089 10.52 95.0689 9.26002 95.1289 8.56002ZM99.0489 11.5C98.2489 11.5 97.9889 11.04 97.9889 10.02C97.9889 9.00002 98.2489 8.52002 99.0489 8.52002C99.8489 8.52002 100.129 9.00002 100.129 10.02C100.129 11.04 99.8489 11.5 99.0489 11.5ZM99.0489 9.02002C98.6489 9.02002 98.5689 9.36002 98.5689 10.02C98.5689 10.66 98.6489 11.02 99.0489 11.02C99.4689 11.02 99.5489 10.66 99.5489 10.02C99.5489 9.36002 99.4689 9.02002 99.0489 9.02002ZM98.8489 3.04002C99.8889 3.04002 100.089 3.88002 100.089 4.30002C100.089 4.92002 99.4689 5.28002 99.0489 5.34002C97.6089 5.50002 96.5689 5.96002 95.7289 6.78002C95.7289 6.78002 97.1889 3.04002 98.8489 3.04002ZM92.1889 4.08002C94.0689 4.08002 95.3089 7.82002 95.3089 7.82002C94.4889 6.78002 93.4489 6.38002 92.1889 6.38002C91.5689 6.38002 90.9489 5.96002 90.9489 5.34002C90.9489 4.70002 91.3689 4.08002 92.1889 4.08002ZM95.6889 1.10002C97.0289 2.40002 95.3089 5.96002 95.3089 5.96002C95.4489 4.64002 94.9889 3.60002 94.0889 2.74002C93.6489 2.30002 93.4889 1.58002 93.9089 1.12002C94.3489 0.680022 95.0889 0.520021 95.6889 1.10002ZM118.121 5.58002C118.121 7.06002 117.421 7.98002 116.101 8.14002L118.081 12.96H115.641L113.641 8.18002H110.941V12.96H108.541V0.420021H115.341C117.061 0.420021 118.121 1.22002 118.121 2.86002V5.58002ZM110.941 2.68002V5.94002H114.781C115.401 5.94002 115.741 5.64002 115.741 5.02002V3.58002C115.741 2.98002 115.361 2.68002 114.781 2.68002H110.941ZM128.563 8.82002H122.243V10.02C122.243 10.5 122.543 10.82 123.023 10.82H128.083V12.96H122.543C120.903 12.96 120.063 12.16 120.063 10.48V5.16002C120.063 3.56002 120.943 2.62002 122.543 2.62002H126.083C127.623 2.62002 128.563 3.52002 128.563 5.12002V8.82002ZM123.083 4.72002C122.543 4.72002 122.243 5.08002 122.243 5.62002V6.74002H126.383V5.56002C126.383 5.10002 126.143 4.72002 125.583 4.72002H123.083ZM131.215 15.72V13.82L135.775 13.8C136.355 13.8 136.855 13.46 136.855 12.74V11.76C136.655 11.98 136.415 12.22 135.715 12.22H132.775C131.355 12.22 130.495 11.46 130.495 9.90002V5.06002C130.495 3.52002 131.335 2.62002 132.955 2.62002H139.015V13.24C139.015 14.84 138.095 15.72 136.495 15.72H131.215ZM133.655 10.08H135.815C136.315 10.08 136.855 9.68002 136.855 8.90002V4.80002H133.775C133.115 4.80002 132.675 5.18002 132.675 5.94002V8.98002C132.675 9.58002 132.975 10.08 133.655 10.08ZM141.361 1.58002V2.19345e-05H143.541V1.58002H141.361ZM141.361 12.96V2.62002H143.541V12.96H141.361ZM148.255 12.96C146.615 12.96 145.675 12.18 145.675 10.56V5.08002C145.675 3.52002 146.575 2.62002 148.255 2.62002H151.575C153.195 2.62002 154.175 3.52002 154.175 5.08002V10.56C154.175 12.12 153.155 12.96 151.575 12.96H148.255ZM148.695 10.82H151.155C151.695 10.82 151.975 10.46 151.975 10V5.64002C151.975 5.08002 151.655 4.78002 151.155 4.78002H148.675C148.135 4.78002 147.855 5.10002 147.855 5.64002V10C147.855 10.44 148.155 10.82 148.695 10.82ZM156.307 12.96V2.66002H158.467V3.36002C158.747 3.06002 159.147 2.62002 159.907 2.62002H162.527C163.967 2.62002 164.787 3.46002 164.787 5.02002V12.96H162.567V5.86002C162.567 5.18002 162.187 4.82002 161.667 4.82002H159.447C158.847 4.82002 158.467 5.22002 158.467 5.88002V12.96H156.307Z" fill="#0F1113" />
                                </svg>

                                <p className="text-[#727A90] text-sm leading-relaxed font-degular mt-3">
                                    Customize your language and region.
                                </p>
                            </div>

                            {/* Right Column - Dropdowns */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Language Dropdown */}
                                    <div>
                                        <label className="block text-[#171717] text-sm mb-3 font-degular">Language</label>
                                        <CustomDropdown
                                            value={language}
                                            onChange={setLanguage}
                                            options={languageOptions}
                                        />
                                    </div>

                                    {/* Region Dropdown */}
                                    <div>
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
                    <div className='px-8'>
                        <div className="h-px w-full bg-[#E5E7EB]"></div>
                    </div>

                    {/* Danger Zone Section */}
                    <div className="px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column - Section Info */}
                            <div className="lg:w-[320px] flex-shrink-0">
                                <h2 className="text-[#171717] text-lg font-bold font-hyperspace mb-2">
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
                                    className="px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white text-[14px] font-medium rounded-xl transition-colors font-degular"
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
                    // Handle account deletion here
                    console.log("Account deleted");
                    setShowDeleteModal(false);
                }}
            />
        </DashboardLayout>
    );
};

export default Home;
