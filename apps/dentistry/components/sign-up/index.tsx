"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "@workspace/ui/components/sonner";
import { SignUpPage, type SignUpFormData } from "@workspace/ui/shared";

import { useSignUp } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";

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

export function SignUpComponent() {
  const router = useRouter();
  const { setLoading, setError, clearError } = useAuthStore();
  const signUpMutation = useSignUp();

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);
      clearError();

      const result = await signUpMutation.mutateAsync(data);

      if (result.success) {
        toast.success(result.message);
        // Redirect to sign-in page after successful sign-up
        router.push("/sign-in");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <SignUpPage
      illustrationComponent={<DentistryIllustration />}
      isLoading={signUpMutation.isPending}
      logoComponent={<div className="text-xl font-bold text-blue-600">Associhealth</div>}
      onNavigateToSignIn={handleNavigateToSignIn}
      onSubmit={handleSubmit}
    />
  );
}
