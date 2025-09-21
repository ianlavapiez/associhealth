import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

export interface SignInIllustrationProps {
  className?: string;
}

export function SignInIllustration({ className }: SignInIllustrationProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
      >
        {/* Background elements */}
        <rect width="400" height="300" fill="white" />

        {/* Left Person */}
        <g id="left-person">
          {/* Head */}
          <circle cx="120" cy="80" r="25" fill="black" />

          {/* Hair */}
          <path d="M95 60 Q120 45 145 60 L140 80 L100 80 Z" fill="black" />

          {/* Body (shirt) */}
          <rect
            x="105"
            y="105"
            width="30"
            height="40"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />

          {/* Arms */}
          <rect x="95" y="110" width="8" height="25" fill="black" />
          <rect x="137" y="110" width="8" height="25" fill="black" />

          {/* Hands */}
          <circle cx="99" cy="140" r="4" fill="black" />
          <circle cx="141" cy="140" r="4" fill="black" />

          {/* Legs */}
          <rect x="110" y="145" width="8" height="30" fill="black" />
          <rect x="122" y="145" width="8" height="30" fill="black" />

          {/* Tablet/E-reader */}
          <rect
            x="130"
            y="120"
            width="25"
            height="35"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <rect x="132" y="125" width="21" height="25" fill="black" opacity="0.1" />
          <line x1="135" y1="130" x2="150" y2="130" stroke="black" strokeWidth="1" />
          <line x1="135" y1="135" x2="150" y2="135" stroke="black" strokeWidth="1" />
          <line x1="135" y1="140" x2="150" y2="140" stroke="black" strokeWidth="1" />

          {/* Speech bubble */}
          <ellipse cx="120" cy="50" rx="20" ry="15" fill="white" stroke="black" strokeWidth="2" />
          <path d="M110 60 L105 70 L115 65 Z" fill="white" stroke="black" strokeWidth="2" />

          {/* Cup/Can */}
          <rect x="90" y="160" width="6" height="15" fill="black" />
          <ellipse cx="93" cy="160" rx="3" ry="2" fill="black" />
        </g>

        {/* Right Person */}
        <g id="right-person">
          {/* Head */}
          <circle cx="280" cy="80" r="25" fill="black" />

          {/* Hair */}
          <path d="M255 60 Q280 45 305 60 L300 80 L260 80 Z" fill="black" />

          {/* Body (top with pattern) */}
          <rect
            x="265"
            y="105"
            width="30"
            height="40"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />

          {/* Pattern on sleeves */}
          <rect x="265" y="110" width="30" height="5" fill="black" />
          <rect x="265" y="120" width="30" height="5" fill="black" />
          <rect x="265" y="130" width="30" height="5" fill="black" />

          {/* Arms */}
          <rect x="255" y="110" width="8" height="25" fill="black" />
          <rect x="297" y="110" width="8" height="25" fill="black" />

          {/* Hands */}
          <circle cx="259" cy="140" r="4" fill="black" />
          <circle cx="301" cy="140" r="4" fill="black" />

          {/* Legs */}
          <rect x="270" y="145" width="8" height="30" fill="black" />
          <rect x="282" y="145" width="8" height="30" fill="black" />

          {/* Shawl/Dupatta */}
          <path
            d="M255 110 Q280 100 305 110 L300 130 L260 130 Z"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
        </g>

        {/* Floor/ground line */}
        <line x1="50" y1="175" x2="350" y2="175" stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
}
