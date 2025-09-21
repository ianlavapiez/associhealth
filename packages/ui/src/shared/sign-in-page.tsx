"use client";

import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

import { SignInForm, type SignInFormData } from "./sign-in-form";
import { SignInIllustration } from "./sign-in-illustration";

export type { SignInFormData };

export interface SignInPageProps {
  className?: string;
  isLoading?: boolean;
  logoComponent?: React.ReactNode;
  onSubmit?: (data: SignInFormData) => void;
  showLogo?: boolean;
}

export function SignInPage({
  className,
  isLoading = false,
  logoComponent,
  onSubmit,
  showLogo = true,
}: SignInPageProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Logo */}
      {showLogo && (
        <div className="absolute top-6 left-6 z-10">
          {logoComponent || <div className="text-xl font-bold text-gray-900">Your Logo</div>}
        </div>
      )}

      {/* Main Layout - Form Left, Illustration Right */}
      <div className="min-h-screen bg-white">
        <div className="flex h-screen">
          {/* Left side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <SignInForm isLoading={isLoading} onSubmit={onSubmit} />
          </div>

          {/* Right side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50">
            <SignInIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}
