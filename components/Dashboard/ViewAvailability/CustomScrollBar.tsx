"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface CustomScrollbarProps {
  children: React.ReactNode;
  maxHeight?: string | number;
  className?: string;
  trackColor?: string;
  thumbColor?: string;
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  maxHeight = "500px",
  className = "",
  trackColor = "#E5E7EB",
  thumbColor = "#3eace2",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);

  // Calculate thumb size and position
  const updateThumb = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const { scrollHeight, clientHeight, scrollTop } = content;
    
    // Check if scrollbar is needed
    if (scrollHeight <= clientHeight) {
      setShowScrollbar(false);
      return;
    }
    
    setShowScrollbar(true);

    // Calculate thumb height (minimum 40px)
    const trackHeight = clientHeight;
    const newThumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 40);
    setThumbHeight(newThumbHeight);

    // Calculate thumb position
    const maxScrollTop = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - newThumbHeight;
    const newThumbTop = (scrollTop / maxScrollTop) * maxThumbTop;
    setThumbTop(newThumbTop);
  }, []);

  // Update thumb on scroll
  const handleScroll = useCallback(() => {
    updateThumb();
  }, [updateThumb]);

  // Handle mouse down on thumb
  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollTop(contentRef.current?.scrollTop || 0);
  }, []);

  // Handle mouse move while dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !contentRef.current) return;

    const content = contentRef.current;
    const { scrollHeight, clientHeight } = content;
    const trackHeight = clientHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - thumbHeight;

    const deltaY = e.clientY - startY;
    const deltaScroll = (deltaY / maxThumbTop) * maxScrollTop;
    
    content.scrollTop = Math.min(Math.max(startScrollTop + deltaScroll, 0), maxScrollTop);
  }, [isDragging, startY, startScrollTop, thumbHeight]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle track click
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (!contentRef.current || !scrollTrackRef.current) return;
    
    const track = scrollTrackRef.current;
    const content = contentRef.current;
    const { scrollHeight, clientHeight } = content;
    
    const trackRect = track.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const trackHeight = trackRect.height;
    
    const maxScrollTop = scrollHeight - clientHeight;
    const scrollTo = (clickY / trackHeight) * maxScrollTop;
    
    content.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Initialize and update on resize
  useEffect(() => {
    updateThumb();
    
    const content = contentRef.current;
    if (content) {
      const resizeObserver = new ResizeObserver(() => {
        updateThumb();
      });
      resizeObserver.observe(content);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [updateThumb]);

  // Update when children change
  useEffect(() => {
    updateThumb();
  }, [children, updateThumb]);

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="overflow-y-auto"
        style={{
          maxHeight: maxHeight,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingRight: showScrollbar ? '12px' : '0',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {children}
      </div>

      {/* Custom Scrollbar - Merged with container edge */}
      {showScrollbar && (
        <div
          ref={scrollTrackRef}
          onClick={handleTrackClick}
          className="absolute right-0 top-0 bottom-0 w-[6px] cursor-pointer"
          style={{
            backgroundColor: trackColor,
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
        >
          {/* Scrollbar Thumb */}
          <div
            ref={scrollThumbRef}
            onMouseDown={handleThumbMouseDown}
            className={`absolute w-full cursor-grab transition-colors ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{
              height: `${thumbHeight}px`,
              top: `${thumbTop}px`,
              backgroundColor: isDragging ? '#35a0d4' : thumbColor,
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
            }}
            onMouseEnter={(e) => {
              if (!isDragging) {
                e.currentTarget.style.backgroundColor = '#35a0d4';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDragging) {
                e.currentTarget.style.backgroundColor = thumbColor;
              }
            }}
          />
        </div>
      )}
    </div>
  );
};