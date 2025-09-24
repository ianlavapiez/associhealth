"use server";

import { db, encrypt, hashPHI, timestamps } from "@workspace/database";
import { persons, users } from "@workspace/database/schema";
import { eq } from "drizzle-orm";

import { signUpSchema, type SignUpFormData } from "@/lib/validators/auth-validator";

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

export async function signUpAction(formData: SignUpFormData): Promise<SignUpResult> {
  try {
    // Validate form data
    const validatedData = signUpSchema.parse(formData);

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        message: "A user with this email already exists",
      };
    }

    // Start a transaction
    const result = await db.transaction(async (tx) => {
      // Create person record
      const [person] = await tx
        .insert(persons)
        .values({
          email: encrypt(validatedData.email),
          emailHash: hashPHI(validatedData.email),
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

      // Create user record
      const [user] = await tx
        .insert(users)
        .values({
          personId: person.id,
          email: validatedData.email, // Store email in plain text for auth purposes
          role: "practitioner", // Default role for dentistry app
          provider: "credentials",
          createdAt: timestamps.createdAt,
          updatedAt: timestamps.updatedAt,
        })
        .returning({
          id: users.id,
          email: users.email,
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
      message: "Account created successfully! Please sign in.",
      user: {
        id: result.id,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
      },
    };
  } catch (error) {
    console.error("Sign up error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
