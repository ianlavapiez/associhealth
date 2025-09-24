import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getDatabaseConfig } from "./config";

// Lazy database connection - only created when first accessed
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    // Get database configuration
    const config = getDatabaseConfig();

    // Create postgres connection
    const client = postgres(config.database.url, {
      ssl: config.database.ssl ? "require" : false,
    });

    // Create drizzle instance
    _db = drizzle(client);
  }

  return _db;
}

// For backward compatibility, export db as a getter
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  },
});
