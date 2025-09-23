
import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

export const RetryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 9a9 9 0 0114.65-4.65l-2.12 2.12A5 5 0 009.05 13.05L12 10m6.95-3.05a5 5 0 00-7.07 0L12 14"
    />
  </svg>
);

export const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M15 4V2"/>
        <path d="M15 8V6"/>
        <path d="M12.5 6.5L14 5"/>
        <path d="M12.5 10.5L14 9"/>
        <path d="M10 5L11.5 6.5"/>
        <path d="M10 9L11.5 10.5"/>
        <path d="M5 12H3"/>
        <path d="M9 12H7"/>
        <path d="M7.5 14.5L6 16"/>
        <path d="M7.5 18.5L6 20"/>
        <path d="M12 15V14"/>
        <path d="M12 19V18"/>
        <path d="M14.5 16L16 14.5"/>
        <path d="M14.5 20L16 18.5"/>
        <path d="M19 12h2"/>
        <path d="M15 12h2"/>
        <path d="M9.4 20.6 2 13.2l.2-2.3 2.3-.2 7.4 7.4.1 2.2-2.2-.1Z"/>
    </svg>
);
