import { useMutation } from "@tanstack/react-query";

import { signUpAction, type SignUpResult } from "@/lib/actions/auth-actions";
import { type SignUpFormData } from "@/lib/validators/auth-validator";

export function useSignUp() {
  return useMutation<SignUpResult, Error, SignUpFormData>({
    mutationFn: signUpAction,
    onError: (error) => {
      console.error("Sign up mutation error:", error);
    },
  });
}
