import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthActions {
  clearError: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface User {
  createdAt: Date;
  email: string;
  id: string;
  personId?: string;
  role: string;
  supabaseUserId?: string;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        // State
        error: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,

        // Actions
        clearError: () => set({ error: null }),

        setError: (error) => set({ error, isLoading: false }),

        setLoading: (isLoading) => set({ isLoading }),

        setUser: (user) =>
          set({
            error: null,
            isAuthenticated: !!user,
            user,
          }),

        signOut: () =>
          set({
            error: null,
            isAuthenticated: false,
            isLoading: false,
            user: null,
          }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    ),
    {
      name: "auth-store", // This will appear in DevTools
    }
  )
);
