"use client";

import React, { useState } from "react";
import { AttendeePill } from "../Meetings/AttendeePill";

interface Member {
    id: string;
    name: string;
    avatar?: string;
}

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGroup?: (data: { title: string; description: string; members: Member[] }) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ 
    isOpen, 
    onClose,
    onCreateGroup 
}) => {
    const [groupTitle, setGroupTitle] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [addedMembers, setAddedMembers] = useState<Member[]>([
        { id: "1", name: "Ammar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { id: "2", name: "Juna Ali", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
        { id: "3", name: "user123@gmail.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
        { id: "4", name: "Ammar", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    ]);

    const handleAddMember = () => {
        if (memberEmail.trim()) {
            const newMember: Member = {
                id: Date.now().toString(),
                name: memberEmail.trim(),
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            };
            setAddedMembers([...addedMembers, newMember]);
            setMemberEmail("");
        }
    };

    const handleRemoveMember = (id: string) => {
        setAddedMembers(addedMembers.filter(member => member.id !== id));
    };

    const handleCreateGroup = () => {
        if (onCreateGroup) {
            onCreateGroup({
                title: groupTitle,
                description: groupDescription,
                members: addedMembers
            });
        }
        // Reset form
        setGroupTitle("");
        setGroupDescription("");
        setMemberEmail("");
        setAddedMembers([]);
        onClose();
    };

    const handleClose = () => {
        // Reset form when closing
        setGroupTitle("");
        setGroupDescription("");
        setMemberEmail("");
        setAddedMembers([]);
        onClose();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddMember();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div 
                className="relative bg-white rounded-3xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto mx-4 p-6 scroll-hidden"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-[#171717] font-hyperspace mb-2" style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '32px'
                    }}>
                        Create Group
                    </h2>
                    <p className="text-[#6B7280] font-degular" style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px'
                    }}>
                        You can create your group here and view availability
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-6">
                    {/* Group Title */}
                    <div className="mb-5">
                        <label className="block text-[#171717] font-degular mb-2" style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}>
                            Group Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g, designer group"
                            value={groupTitle}
                            onChange={(e) => setGroupTitle(e.target.value)}
                            className="w-full h-[48px] px-4 bg-[#F3F4F6] border-0 rounded-xl text-[#171717] placeholder-[#9CA3AF] font-degular focus:outline-none focus:ring-2 focus:ring-[#3EACE2] transition-all"
                            style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px'
                            }}
                        />
                    </div>

                    {/* Group Description */}
                    <div className="mb-5">
                        <label className="block text-[#171717] font-degular mb-2" style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}>
                            Group Description
                        </label>
                        <textarea
                            placeholder="e.g, designer groups of the detals"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-4 bg-[#F3F4F6] border-0 rounded-xl text-[#171717] placeholder-[#9CA3AF] font-degular focus:outline-none focus:ring-2 focus:ring-[#3EACE2] transition-all resize-none"
                            style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px'
                            }}
                        />
                    </div>

                    {/* Add Members */}
                    <div className="mb-5">
                        <label className="block text-[#171717] font-degular mb-2" style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '20px'
                        }}>
                            Add Members
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                placeholder="e.g, user123@gmail.com"
                                value={memberEmail}
                                onChange={(e) => setMemberEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 h-[48px] px-4 bg-[#F3F4F6] border-0 rounded-xl text-[#171717] placeholder-[#9CA3AF] font-degular focus:outline-none focus:ring-2 focus:ring-[#3EACE2] transition-all"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: 400,
                                    lineHeight: '24px'
                                }}
                            />
                            <button
                                onClick={handleAddMember}
                                className="flex items-center gap-2 px-5 h-[48px] bg-[#0F1113] text-white rounded-2xl font-degular hover:bg-gray-800 transition-colors"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    lineHeight: '24px'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>

                    {/* Added Members */}
                    {addedMembers.length > 0 && (
                        <div>
                            <label className="block text-[#171717] font-degular mb-3" style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '20px'
                            }}>
                                Added Members
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {addedMembers.map((member) => (
                                    <AttendeePill
                                        key={member.id}
                                        id={member.id}
                                        email={member.name}
                                        avatar={member.avatar || ""}
                                        onRemove={handleRemoveMember}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Create Group Button */}
                <button
                    onClick={handleCreateGroup}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#3EACE2] text-white rounded-2xl font-hyperspace hover:bg-[#35a0d4] transition-colors"
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Create Group</span>
                </button>
            </div>
        </div>
    );
};