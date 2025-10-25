"use server";

import { db, timestamps, createServerClient } from "@workspace/database";
import { persons, users } from "@workspace/database/schema";
import { eq } from "drizzle-orm";

import { signUpSchema, type SignUpFormData } from "@/lib/validators/auth-validator";

export interface SignInResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
  };
}

export interface SignUpResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
  };
}

export async function signInAction(email: string, password: string): Promise<SignInResult> {
  try {
    // Create Supabase client
    const supabase = await createServerClient();

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("authError", authError);

      // Provide user-friendly error messages for common scenarios
      if (authError.message.includes("Invalid login credentials")) {
        return {
          success: false,
          message: "Invalid email or password. Please try again.",
        };
      }
      if (authError.message.includes("Email not confirmed")) {
        return {
          success: false,
          message: "Please check your email and click the confirmation link before signing in.",
        };
      }
      return {
        success: false,
        message: "Unable to sign in. Please try again.",
      };
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Unable to sign in. Please try again.",
      };
    }

    // Get our custom user record
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.supabaseUserId, authData.user.id))
      .limit(1);

    if (!user) {
      return {
        success: false,
        message: "Account not found. Please contact support.",
      };
    }

    return {
      success: true,
      message: "Welcome back! You've signed in successfully.",
      user: {
        id: user.id,
        email: authData.user.email!,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch {
    return {
      success: false,
      message: "Unable to sign in. Please try again.",
    };
  }
}

export async function signOutAction(): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Signed out successfully!",
    };
  } catch {
    return {
      success: false,
      message: "Unable to sign out. Please try again.",
    };
  }
}

export async function signUpAction(formData: SignUpFormData): Promise<SignUpResult> {
  try {
    // Validate form data
    const validatedData = signUpSchema.parse(formData);

    // Create Supabase client
    const supabase = await createServerClient();

    // Check if user already exists in Supabase
    const { data: existingUser } = await supabase.auth.getUser();
    if (existingUser.user) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (authError) {
      // Provide user-friendly error messages for common scenarios
      if (authError.message.includes("User already registered")) {
        return {
          success: false,
          message: "An account with this email already exists.",
        };
      }
      if (authError.message.includes("Password should be at least")) {
        return {
          success: false,
          message: "Password is too short. Please choose a stronger password.",
        };
      }
      if (authError.message.includes("Invalid email")) {
        return {
          success: false,
          message: "Please enter a valid email address.",
        };
      }
      return {
        success: false,
        message: "Unable to create account. Please try again.",
      };
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Unable to create account. Please try again.",
      };
    }

    const supabaseUser = authData.user;

    // Create our custom user record linked to Supabase user
    const result = await db.transaction(async (tx) => {
      // Create person record
      const [person] = await tx
        .insert(persons)
        .values({
          email: validatedData.email,
          createdAt: timestamps.createdAt,
          updatedAt: timestamps.updatedAt,
        })
        .returning({
          id: persons.id,
          createdAt: persons.createdAt,
        });

      if (!person) {
        throw new Error("Failed to create person record");
      }

      // Create user record linked to Supabase user
      const [user] = await tx
        .insert(users)
        .values({
          supabaseUserId: supabaseUser.id,
          personId: person.id,
          role: "practitioner", // Default role for dentistry app
          provider: "supabase",
          createdAt: timestamps.createdAt,
          updatedAt: timestamps.updatedAt,
        })
        .returning({
          id: users.id,
          role: users.role,
          createdAt: users.createdAt,
        });

      if (!user) {
        throw new Error("Failed to create user record");
      }

      return user;
    });

    return {
      success: true,
      message: "Account created successfully! Please check your email to confirm your account.",
      user: {
        id: result.id,
        email: validatedData.email,
        role: result.role,
        createdAt: result.createdAt,
      },
    };
  } catch (error) {
    console.error("Auth actions error:", error);
    if (error instanceof Error && error.message.includes("Failed to")) {
      return {
        success: false,
        message: "Unable to create account. Please try again.",
      };
    }

    return {
      success: false,
      message: "Unable to create account. Please try again.",
    };
  }
}
