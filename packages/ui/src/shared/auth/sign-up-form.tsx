"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { cn } from "@workspace/ui/lib/utils";

export interface SignUpFormProps {
  className?: string;
  isLoading?: boolean;
  onNavigateToSignIn?: () => void;
  onSubmit?: (data: SignUpFormData) => void;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "Use 8 or more characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "case",
    text: "Use upper and lower case letters (e.g. Aa)",
    validator: (password) => /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    id: "number",
    text: "Use a number (e.g. 1234)",
    validator: (password) => /\d/.test(password),
  },
  {
    id: "symbol",
    text: "Use a symbol (e.g. !@#$)",
    validator: (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  },
];

export function SignUpForm({
  className,
  isLoading = false,
  onNavigateToSignIn,
  onSubmit,
}: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange =
    (field: keyof SignUpFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic here
    console.log("Google sign-up clicked");
  };

  const isPasswordValid = passwordRequirements.every((req) => req.validator(formData.password));
  const doPasswordsMatch =
    formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="bg-card rounded-lg shadow-lg p-8 border">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Sign up</h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-semibold"
              disabled={isLoading}
              onClick={onNavigateToSignIn}
            >
              Log in
            </Button>
          </p>
        </div>

        {/* Google Sign Up Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignUp}
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
          Sign up with Google
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

          {/* Password Requirements */}
          {formData.password && (
            <div className="space-y-2">
              {passwordRequirements.map((requirement) => {
                const isValid = requirement.validator(formData.password);
                return (
                  <div key={requirement.id} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        isValid ? "bg-green-500" : "bg-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs",
                        isValid ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                      )}
                    >
                      {requirement.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm your password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                required
                disabled={isLoading}
                className="w-full pr-20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="text-xs">{showConfirmPassword ? "Hide" : "Show"}</span>
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    doPasswordsMatch ? "bg-green-500" : "bg-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    doPasswordsMatch
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  )}
                >
                  Passwords match
                </span>
              </div>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={isLoading || !isPasswordValid || !doPasswordsMatch}
            className="w-full h-12 text-base font-medium"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
}
