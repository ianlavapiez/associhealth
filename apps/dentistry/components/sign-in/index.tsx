"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { SignInPage, type SignInFormData } from "@workspace/ui/shared";

// Custom illustration component using dentistry.png
function DentistryIllustration() {
  return (
    <div className="flex items-center justify-center p-8">
      <Image
        src="/dentistry.png"
        alt="Dentistry illustration"
        width={700}
        height={600}
        className="max-w-full h-auto object-contain"
        priority
      />
    </div>
  );
}

export function SignInComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Sign in data:", data);
    setIsLoading(false);
  };

  const handleNavigateToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <SignInPage
      illustrationComponent={<DentistryIllustration />}
      isLoading={isLoading}
      logoComponent={<div className="text-xl font-bold text-blue-600">Associhealth</div>}
      onNavigateToSignUp={handleNavigateToSignUp}
      onSubmit={handleSubmit}
    />
  );
}
