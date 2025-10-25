"use client";

import { cn } from "@workspace/ui/lib/utils";

import { SignInForm, type SignInFormData } from "./sign-in-form";

export type { SignInFormData };

export interface SignInPageProps {
  className?: string;
  illustrationComponent: React.ReactNode;
  isLoading?: boolean;
  logoComponent?: React.ReactNode;
  onNavigateToSignUp?: () => void;
  onSubmit?: (data: SignInFormData) => void;
  showLogo?: boolean;
}

export function SignInPage({
  className,
  illustrationComponent,
  isLoading = false,
  logoComponent,
  onNavigateToSignUp,
  onSubmit,
  showLogo = true,
}: SignInPageProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Logo */}
      {showLogo && (
        <div className="absolute top-6 left-6 z-10">
          {logoComponent || <div className="text-xl font-bold text-foreground">Your Logo</div>}
        </div>
      )}

      {/* Main Layout - Form Left, Illustration Right */}
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          {/* Left side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <SignInForm
              isLoading={isLoading}
              onNavigateToSignUp={onNavigateToSignUp}
              onSubmit={onSubmit}
            />
          </div>

          {/* Right side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-muted/30">
            {illustrationComponent}
          </div>
        </div>
      </div>
    </div>
  );
}
