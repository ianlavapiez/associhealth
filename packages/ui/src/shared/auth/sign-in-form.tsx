"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { cn } from "@workspace/ui/lib/utils";

export interface SignInFormProps {
  className?: string;
  isLoading?: boolean;
  onNavigateToSignUp?: () => void;
  onSubmit?: (data: SignInFormData) => void;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm({
  className,
  isLoading = false,
  onNavigateToSignUp,
  onSubmit,
}: SignInFormProps) {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: keyof SignInFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="bg-card rounded-lg shadow-lg p-8 border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Log in</h1>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-semibold"
              disabled={isLoading}
              onClick={onNavigateToSignUp}
            >
              Sign up
            </Button>
          </p>
        </div>

        {/* Google Sign In Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full mb-6 h-12"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Log in with Google
        </Button>

        {/* Divider */}
        <div className="relative mb-6">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-card px-2 text-sm text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Your password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange("password")}
                required
                disabled={isLoading}
                className="w-full pr-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="text-xs">{showPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
              disabled={isLoading}
            >
              Forget your password?
            </Button>
          </div>

          {/* Login Button */}
          <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-medium">
            {isLoading ? "Signing in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
