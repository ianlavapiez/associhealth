"use client";

import { useRouter } from "next/navigation";

import { toast } from "@workspace/ui/components/sonner";
import { SignUpPage, type SignUpFormData } from "@workspace/ui/shared";

import { AssocihealthLogo, DentistryIllustration } from "@/components/shared";
import { useSignUp } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";

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
      const errorMessage =
        error instanceof Error ? error.message : "Unable to create account. Please try again.";
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
      logoComponent={<AssocihealthLogo />}
      onNavigateToSignIn={handleNavigateToSignIn}
      onSubmit={handleSubmit}
    />
  );
}
