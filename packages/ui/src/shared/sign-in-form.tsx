"use client";

import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";

export interface SignInFormProps {
  className?: string;
  isLoading?: boolean;
  onSubmit?: (data: SignInFormData) => void;
}

export interface SignInFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function SignInForm({ className, isLoading = false, onSubmit }: SignInFormProps) {
  const [formData, setFormData] = React.useState<SignInFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange =
    (field: keyof SignInFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: field === "rememberMe" ? e.target.checked : e.target.value,
      }));
    };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal text-gray-900 mb-2">Welcome !</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in to</h2>
          <p className="text-sm text-gray-600">Lorem Ipsum is simply</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              User name
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your user name"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange("password")}
                required
                disabled={isLoading}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, rememberMe: !!checked }))
                }
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-800 rounded-md h-12 text-base font-medium"
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an Account?{" "}
              <button
                type="button"
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                disabled={isLoading}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
