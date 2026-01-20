"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EmpowerMeetIcon } from "../Svgs/Sign-In/Icons";
import { LeftColumn } from "./LeftColumn";
import { RightColumn } from "./RightColumn";
import { Logo } from "./Logo";
import { Heading } from "./Heading";
import { InputField } from "./InputField";
import { Checkbox } from "./Checkbox";
import { LoginButton } from "./LoginButton";
import { PersonIcon, EmailIcon, LockIcon, EyeIcon } from "./Icons";

const Home = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row mx-auto p-5">
      {/* Left Column - Login Form */}
      <LeftColumn>
        <Logo />
        <Heading 
          title="Hi, Welcome" 
          subtitle="Please login to entry Syncmeetly" 
        />

        {/* Tabs */}
        <div className="flex bg-white rounded-full p-1.5 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 px-8 rounded-full transition-all ${
              activeTab === "login"
                ? "bg-[#E4E4E4] text-[#171717] font-semibold"
                : "text-[#171717]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 px-8 rounded-full transition-all ${
              activeTab === "signup"
                ? "bg-[#E4E4E4] text-[#171717] font-semibold"
                : "text-[#171717]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Full Name Field - Only for Sign Up */}
          {activeTab === "signup" && (
            <InputField
              label="Full Name"
              type="text"
              placeholder="e.g., Noam Laish"
              icon={<PersonIcon />}
              borderColor="#E5E7EB"
            />
          )}

          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            placeholder="Input your email"
            icon={<EmailIcon />}
            borderColor="#7ec8e8"
          />

          {/* Password Field */}
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Input your password"
            icon={<LockIcon />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                <EyeIcon show={showPassword} />
              </button>
            }
            borderColor="#E5E7EB"
          />

          {/* Login Button */}
          <LoginButton text={activeTab === "login" ? "Login" : "Sign Up"} />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={setRememberMe}
            />
            {activeTab === "login" && (
              <Link href="/forgot-password" className="text-sm text-[#0F1113] underline underline-offset-2 hover:text-[#56b8dd]">
                Forgot Password ?
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center ">
              <span className="px-4 text-sm text-[#171717]/60 bg-[#f8f8fc]">
                Or Sign in with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#D3D6DD] bg-white rounded-full hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.171 8.368h-.671V8.333H10v3.334h4.71A5 5 0 1110 5a4.975 4.975 0 013.317 1.266l2.357-2.357A8.333 8.333 0 1018.333 10c0-.559-.054-1.104-.162-1.632z" fill="#FFC107" />
                <path d="M2.628 6.121l2.737 2.008A5 5 0 0110 5a4.975 4.975 0 013.317 1.266l2.357-2.357A8.333 8.333 0 002.628 6.121z" fill="#FF3D00" />
                <path d="M10 18.333a8.294 8.294 0 005.587-2.163l-2.58-2.183A4.967 4.967 0 0110 15a5 5 0 01-4.701-3.311l-2.717 2.094A8.333 8.333 0 0010 18.333z" fill="#4CAF50" />
                <path d="M18.171 8.368h-.671V8.333H10v3.334h4.71a5.017 5.017 0 01-1.703 2.32l2.58 2.183c-.183.166 2.746-2.003 2.746-6.17 0-.559-.054-1.104-.162-1.632z" fill="#1976D2" />
              </svg>
              <span
                className="text-[#0F1113] font-degular"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0.005em'
                }}
              >
                Sign in with Google
              </span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#D3D6DD] bg-white rounded-full hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14.076 10.523c-.008-1.504.677-2.625 2.062-3.455-.787-1.113-1.962-1.726-3.517-1.848-1.478-.122-3.095.858-3.68.858-.617 0-2.044-.82-3.192-.82C3.388 5.298.876 7.108.876 10.723c0 1.075.193 2.185.578 3.33.517 1.492 2.367 5.08 4.297 5.017 1.07-.025 1.83-.747 3.222-.747 1.353 0 2.05.747 3.245.747 1.948-.028 3.615-3.285 4.108-4.78-2.425-1.152-2.25-3.693-2.25-3.768zM11.788 3.723c1.133-1.343 1.025-2.565.993-2.973-1.007.06-2.17.693-2.83 1.458-.727.822-1.154 1.84-1.064 2.985 1.092.085 2.082-.5 2.901-1.47z" fill="#171717" />
              </svg>
              <span
                className="text-[#0F1113] font-degular"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  letterSpacing: '0.005em'
                }}
              >
                Sign in with Apple
              </span>
            </button>
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

export default Home;
