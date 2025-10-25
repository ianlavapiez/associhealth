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
  });
}

export function useSignIn() {
  return useMutation<SignInResult, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => signInAction(email, password),
  });
}

export function useSignOut() {
  return useMutation<{ success: boolean; message: string }, Error, void>({
    mutationFn: signOutAction,
  });
}
