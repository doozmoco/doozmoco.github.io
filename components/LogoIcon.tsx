
import React from 'react';

/**
 * An elegant, abstract SVG icon for the "6 Yards by Katyayini" brand.
 * It combines a flowing curve representing a saree drape with a simple
 * leaf/petal shape suggesting a lotus flower.
 */
const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* A flowing curve representing a saree drape */}
        <path d="M4,20 C4,10 12,4 20,4" />
        {/* A simple leaf/petal shape, suggesting a lotus */}
        <path d="M10,20 C12,14 16,14 18,20" />
    </svg>
);

export default LogoIcon;
