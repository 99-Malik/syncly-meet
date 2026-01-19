"use client";

import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/layout';
import { Header } from '@/components/Dashboard/Header';
import { ChatMessage } from './ChatMessage';
import { DateSeparator } from './DateSeparator';
import { ChatInput } from './ChatInput';
import { AiChatIcon } from "./Icons";
import { HistorySidebar } from './HistorySidebar';
import { UserIcon } from "./Icons";
interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string;
}

export default function AiAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };

        // Add user message immediately
        setMessages([...messages, userMessage]);

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateAIResponse(text),
                isUser: false,
                timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        }, 1000);
    };

    const generateAIResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Generate contextual responses based on user input
        if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
            return "Got it! I can help you schedule a meeting. What date and time would work best for you?";
        } else if (lowerMessage.includes('agenda') || lowerMessage.includes('today')) {
            return "Here's your agenda for today:\n\n1. Team stand-up meeting at 10:00 AM\n2. Review project proposals\n3. Client call at 2:00 PM\n\nWould you like me to add or modify anything?";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I understand. Let me help you with that. Could you provide a bit more detail so I can assist you better?";
        }
    };

    const handleQuickAction = (action: string) => {
        handleSendMessage(action);
    };

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    };

    // Mock recent chats data
    const recentChats = [
        { id: '1', title: "Today's stock news...", isActive: true },
        { id: '2', title: "Monthly strategy meeti...", isActive: false },
        { id: '3', title: "Daily stand-up: Progres...", isActive: false },
        { id: '4', title: "Q4 planning discussion...", isActive: false },
        { id: '5', title: "Team sync: Project upd...", isActive: false },
        { id: '6', title: "Client feedback review...", isActive: false },
    ];



    // AI Avatar - Orange with person icon
    const AIAvatar = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#FFE8CC" />
            <path d="M21.6667 21.6667H18.3334C16.0322 21.6667 14.1667 23.5321 14.1667 25.8333V26.6667C14.1667 27.1269 14.5398 27.5 15.0001 27.5H25.0001C25.4603 27.5 25.8334 27.1269 25.8334 26.6667V25.8333C25.8334 23.5321 23.9679 21.6667 21.6667 21.6667Z" stroke="#FF8A00" stroke-width="1.66667" />
            <path d="M20.0001 19.1667C21.841 19.1667 23.3334 17.6743 23.3334 15.8333C23.3334 13.9924 21.841 12.5 20.0001 12.5C18.1591 12.5 16.6667 13.9924 16.6667 15.8333C16.6667 17.6743 18.1591 19.1667 20.0001 19.1667Z" stroke="#FF8A00" stroke-width="1.66667" />
        </svg>

    );

    return (
        <DashboardLayout>
            <div className="h-full flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex-shrink-0">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <h1 className="text-2xl font-bold text-[#171717] font-hyperspace" style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    lineHeight: '120%',
                                    letterSpacing: '-0.02em'
                                }}>
                                    AI Assistant
                                </h1>
                                <p className="font-degular mt-2" style={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    letterSpacing: '0.005em'
                                }}>
                                    <span className="text-[#171717]">Dashboard</span>
                                    <span className="text-[#686F83] mx-1">/</span>
                                    <span className="text-[#686F83]">AI Assistant</span>
                                </p>
                            </div>
                            {/* History/Close Button */}
                            <button
                                onClick={toggleHistory}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F8F8FC] transition-colors"
                            >
                                {isHistoryOpen ? (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992H2.66671C2.66671 10.9453 5.05471 13.3333 8.00004 13.3333C10.9454 13.3333 13.3334 10.9453 13.3334 7.99992C13.3334 5.05459 10.9454 2.66659 8.00004 2.66659C6.35737 2.66659 4.88804 3.40925 3.91004 4.57659L5.33337 5.99992H1.33337V1.99992L2.96471 3.63059C4.18671 2.22392 5.98937 1.33325 8.00004 1.33325ZM8.66671 4.66659V7.72325L10.8287 9.88525L9.88537 10.8286L7.33337 8.27525V4.66659H8.66671Z" fill="#8E95A6" />
                                        </svg>

                                        <span className="font-degular text-[#171717]" style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            lineHeight: '20px',
                                            letterSpacing: '0.005em'
                                        }}>
                                            Close
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.00004 1.33325C11.682 1.33325 14.6667 4.31792 14.6667 7.99992C14.6667 11.6819 11.682 14.6666 8.00004 14.6666C4.31804 14.6666 1.33337 11.6819 1.33337 7.99992H2.66671C2.66671 10.9453 5.05471 13.3333 8.00004 13.3333C10.9454 13.3333 13.3334 10.9453 13.3334 7.99992C13.3334 5.05459 10.9454 2.66659 8.00004 2.66659C6.35737 2.66659 4.88804 3.40925 3.91004 4.57659L5.33337 5.99992H1.33337V1.99992L2.96471 3.63059C4.18671 2.22392 5.98937 1.33325 8.00004 1.33325ZM8.66671 4.66659V7.72325L10.8287 9.88525L9.88537 10.8286L7.33337 8.27525V4.66659H8.66671Z" fill="#8E95A6" />
                                        </svg>

                                        <span className="font-degular text-[#171717]" style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            lineHeight: '20px',
                                            letterSpacing: '0.005em'
                                        }}>
                                            History
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                        {/* Separator */}
                        <div className="border-t border-[#E5E7EB] mt-4"></div>
                    </div>
                </div>

                {/* Main Content Area with Sidebar */}
                <div className={`flex-1 flex gap-6 min-h-0 relative ${isHistoryOpen ? 'overflow-x-visible overflow-y-hidden' : 'overflow-hidden'}`}>
                    {/* Mobile Backdrop */}
                    {isHistoryOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={toggleHistory}
                        />
                    )}

                    {/* Chat Container */}
                    <div className={`flex-1 flex flex-col bg-transparent overflow-hidden min-h-0 h-full transition-all duration-300 ${isHistoryOpen ? 'lg:flex-[0_0_calc(100%-264px)]' : 'flex-1'}`}>
                        {/* Messages Area - Scrollable */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-1 pb-6  scroll-hidden overflow-y-auto overflow-x-hidden min-h-0"
                        >
                            {messages.length === 0 ? (
                                // Empty State
                                <div className="h-full flex flex-col items-center justify-center">
                                    {/* AI Icon */}
                                    <div className="mb-6">
                                        <AiChatIcon />
                                    </div>

                                    {/* Greeting */}
                                    <h2 className="text-2xl font-bold text-[#171717] mb-2 font-hyperspace" style={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        lineHeight: '120%',
                                        letterSpacing: '-0.02em'
                                    }}>
                                        Good Morning, Jackie 👋
                                    </h2>

                                    {/* Prompt */}
                                    <p className="text-[#686F83] mb-4 font-semibold text-center" style={{
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        lineHeight: '28px',
                                        letterSpacing: '0.005em'
                                    }}>
                                        What's your agenda for today, let me know about it
                                    </p>

                                    {/* Quick Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleQuickAction("Schedule Meeting")}
                                            className="px-6 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F8FC] hover:bg-[#F8F8FC] transition-colors font-degular"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                lineHeight: '20px',
                                                letterSpacing: '0.005em',
                                                color: '#171717'
                                            }}
                                        >
                                            Schedule Meeting
                                        </button>
                                        <button
                                            onClick={() => handleQuickAction("Today's Agenda")}
                                            className="px-6 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F8FC] hover:bg-[#F8F8FC] transition-colors font-degular"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                lineHeight: '20px',
                                                letterSpacing: '0.005em',
                                                color: '#171717'
                                            }}
                                        >
                                            Today's Agenda
                                        </button>
                                        <button
                                            onClick={() => handleQuickAction("Write anything")}
                                            className="px-6 py-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F8FC] hover:bg-[#F8F8FC] transition-colors font-degular"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                lineHeight: '20px',
                                                letterSpacing: '0.005em',
                                                color: '#171717'
                                            }}
                                        >
                                            Write anything
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Messages List
                                <>
                                    <DateSeparator date="Today" />

                                    {messages.map((message) => (
                                        <ChatMessage
                                            key={message.id}
                                            message={message.text}
                                            isUser={message.isUser}
                                            timestamp={message.timestamp}
                                            avatar={message.isUser ? <UserIcon /> : <AIAvatar />}
                                        />
                                    ))}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input Bar - Fixed */}
                        <div className="flex-shrink-0">
                            <ChatInput onSend={handleSendMessage} compact={isHistoryOpen} />
                        </div>
                    </div>

                    {/* History Sidebar */}
                    <HistorySidebar
                        recentChats={recentChats}
                        isOpen={isHistoryOpen}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}   