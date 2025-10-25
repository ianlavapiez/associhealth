"use client";

import { cn } from "@workspace/ui/lib/utils";

import { SignUpForm, type SignUpFormData } from "./sign-up-form";

export type { SignUpFormData };

export interface SignUpPageProps {
  className?: string;
  illustrationComponent: React.ReactNode;
  isLoading?: boolean;
  logoComponent?: React.ReactNode;
  onNavigateToSignIn?: () => void;
  onSubmit?: (data: SignUpFormData) => void;
  showLogo?: boolean;
}

export function SignUpPage({
  className,
  illustrationComponent,
  isLoading = false,
  logoComponent,
  onNavigateToSignIn,
  onSubmit,
  showLogo = true,
}: SignUpPageProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Logo */}
      {showLogo && (
        <div className="absolute top-6 right-6 z-10">
          {logoComponent || <div className="text-xl font-bold text-foreground">Your Logo</div>}
        </div>
      )}

      {/* Main Layout - Illustration Left, Form Right */}
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          {/* Left side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-muted/30">
            {illustrationComponent}
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <SignUpForm
              isLoading={isLoading}
              onNavigateToSignIn={onNavigateToSignIn}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
