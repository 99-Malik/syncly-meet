"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmpowerMeetIcon } from "../../components/Svgs/Sign-In/Icons";
import { LeftColumn } from "../../components/Sign-In/LeftColumn";
import { RightColumn } from "../../components/Sign-In/RightColumn";
import { Logo } from "../../components/Sign-In/Logo";
import { Heading } from "../../components/Sign-In/Heading";
import { InputField } from "../../components/Sign-In/InputField";
import { LoginButton } from "../../components/Sign-In/LoginButton";
import { EmailIcon } from "../../components/Sign-In/Icons";

const ForgotPasswordPage = () => {
    const router = useRouter();
    
    return (
        <div className="min-h-screen flex flex-col lg:flex-row mx-auto p-5">
            {/* Left Column - Forgot Password Form */}
            <LeftColumn>
                <Logo />
                <Heading
                    title="Forgot Password ?"
                    subtitle="No worries, we'll send you reset link"
                />

                {/* Form */}
                <div className="space-y-6">
                    {/* Email Field */}
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Input your email"
                        icon={<EmailIcon />}
                        borderColor="#E5E7EB"
                    />

                    {/* Reset Button */}
                    <LoginButton text="Get Reset Link" onClick={() => router.push('/reset-password')} />

                    {/* Back Link */}
                    <div >
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-[#171717] hover:text-[#3eace2] transition-colors justify-center cursor-pointer"
                        >
                            <svg width="91" height="40" viewBox="0 0 91 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_15_6528)">
                                    <path d="M21.871 19.25H31V20.75H21.871L25.894 24.773L24.8335 25.8335L19 20L24.8335 14.1665L25.894 15.227L21.871 19.25Z" fill="#0F1113" />
                                </g>
                                <path d="M46.9434 15.6H50.3594C52.2774 15.6 53.1594 16.328 53.1594 17.742C53.1594 18.82 52.5434 19.45 51.5074 19.702V19.814C52.9214 19.982 53.5654 20.556 53.5654 21.732C53.5654 23.062 52.7254 24 50.6534 24H46.9434V15.6ZM48.2314 22.992H50.6114C51.7734 22.992 52.2914 22.446 52.2914 21.634C52.2914 20.78 51.8434 20.29 50.5414 20.29H48.2314V22.992ZM48.2314 19.338H50.3174C51.2694 19.338 51.9134 18.96 51.9134 17.938C51.9134 17.056 51.4794 16.622 50.4014 16.622H48.2314V19.338ZM56.5244 24.14C55.2924 24.14 54.4944 23.58 54.4944 22.32C54.4944 21.186 55.2084 20.36 56.8184 20.36H58.9184V19.828C58.9184 18.848 58.5404 18.316 57.4764 18.316C56.5944 18.316 56.1044 18.75 55.8944 19.618L54.7464 19.338C55.0124 18.078 55.9504 17.308 57.5184 17.308C59.3384 17.308 60.1364 18.19 60.1364 19.814V24H58.9744V22.446H58.8484C58.5124 23.524 57.6864 24.14 56.5244 24.14ZM58.9184 21.2H57.0004C56.1464 21.2 55.6564 21.536 55.6564 22.18C55.6564 22.698 55.9784 23.16 56.9444 23.16C58.1484 23.16 58.9184 22.488 58.9184 21.564V21.2ZM66.5367 19.94C66.3127 18.974 65.8647 18.372 64.6887 18.372C63.4567 18.372 62.7007 19.17 62.7007 20.738C62.7007 22.18 63.4147 23.09 64.7447 23.09C65.9487 23.09 66.3407 22.362 66.5787 21.48L67.6987 21.774C67.4047 23.272 66.5087 24.168 64.7587 24.168C62.7007 24.168 61.4547 22.922 61.4547 20.752C61.4547 18.582 62.7567 17.294 64.7167 17.294C66.5507 17.294 67.4047 18.162 67.6707 19.702L66.5367 19.94ZM70.3827 15.012V20.248H71.0267L73.3927 17.462H74.7787V17.616L71.9927 20.682L75.0167 23.846V24H73.6167L71.0407 21.172H70.3827V24H69.1647V15.012H70.3827Z" fill="black" />
                                <defs>
                                    <clipPath id="clip0_15_6528">
                                        <rect width="18" height="18" fill="white" transform="translate(16 11)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </Link>
                    </div>
                </div>
            </LeftColumn>

            {/* Right Column - Illustration */}
            <RightColumn>
                <div className="mb-8 w-full max-w-[670px] 2xl:max-w-[800px]">
                    <EmpowerMeetIcon />
                </div>


            </RightColumn>
        </div>
    );
};

export default ForgotPasswordPage;
