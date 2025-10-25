"use client";

import { useRouter } from "next/navigation";

import { toast } from "@workspace/ui/components/sonner";
import { SignInPage, type SignInFormData } from "@workspace/ui/shared";

import { AssocihealthLogo, DentistryIllustration } from "@/components/shared";
import { useSignIn } from "@/hooks/use-auth";
import { useAuthStore } from "@/lib/stores/auth-store";

export function SignInComponent() {
  const router = useRouter();
  const { setLoading, setError, clearError } = useAuthStore();
  const signInMutation = useSignIn();

  const handleSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      clearError();

      const result = await signInMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        toast.success(result.message);
        // Redirect to dashboard or home page after successful sign-in
        router.push("/patients");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to sign in. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <SignInPage
      illustrationComponent={<DentistryIllustration />}
      isLoading={signInMutation.isPending}
      logoComponent={<AssocihealthLogo />}
      onNavigateToSignUp={handleNavigateToSignUp}
      onSubmit={handleSubmit}
    />
  );
}
