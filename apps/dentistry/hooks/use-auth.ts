import { useMutation } from "@tanstack/react-query";

import {
  signInAction,
  signOutAction,
  signUpAction,
  type SignInResult,
  type SignUpResult,
} from "@/lib/actions/auth-actions";
import { type SignUpFormData } from "@/lib/validators/auth-validator";

export function useSignUp() {
  return useMutation<SignUpResult, Error, SignUpFormData>({
    mutationFn: signUpAction,
    onError: (error) => {
      console.error("Sign up mutation error:", error);
    },
  });
}

export function useSignIn() {
  return useMutation<SignInResult, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => signInAction(email, password),
    onError: (error) => {
      console.error("Sign in mutation error:", error);
    },
  });
}

export function useSignOut() {
  return useMutation<{ success: boolean; message: string }, Error, void>({
    mutationFn: signOutAction,
    onError: (error) => {
      console.error("Sign out mutation error:", error);
    },
  });
}
