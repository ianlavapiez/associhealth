import { sql } from "drizzle-orm";

/**
 * Standard timestamp functions for database operations
 * Centralized location for consistent timestamp handling
 */

export const timestamps = {
  /**
   * Current timestamp using database's now() function
   * Use for createdAt fields
   */
  createdAt: sql`now()`,

  /**
   * Current timestamp using database's now() function
   * Use for updatedAt fields
   */
  updatedAt: sql`now()`,

  /**
   * Null value for soft delete flag
   * Use for deletedAt fields (soft deletes)
   */
  deletedAt: null,
} as const;

/**
 * Helper function to get current timestamp for soft delete
 * Use when actually performing a soft delete operation
 */
export const softDeleteTimestamp = sql`now()`;
