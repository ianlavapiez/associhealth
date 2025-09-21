"use client";

import { useState } from "react";

import { SignInPage, type SignInFormData } from "@workspace/ui/shared/sign-in-page";

export default function SignInDemoPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Sign in data:", data);
    setIsLoading(false);
  };

  return (
    <SignInPage
      isLoading={isLoading}
      logoComponent={<div className="text-xl font-bold text-blue-600">AssociHealth</div>}
      onSubmit={handleSubmit}
    />
  );
}
