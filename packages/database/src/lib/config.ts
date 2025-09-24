// ======================================
// Environment Configuration
// ======================================

export interface DatabaseConfig {
  encryption: {
    key: string;
    hashSalt: string;
  };
  database: {
    url: string;
    ssl: boolean;
  };
}

/**
 * Validates and returns database configuration from environment variables
 */
export function getDatabaseConfig(): DatabaseConfig {
  const encryptionKey = process.env.DATABASE_ENCRYPTION_KEY;
  const hashSalt = process.env.DATABASE_HASH_SALT;
  const databaseUrl = process.env.DATABASE_URL;

  if (!encryptionKey) {
    throw new Error("DATABASE_ENCRYPTION_KEY environment variable is required");
  }

  if (encryptionKey.length < 32) {
    throw new Error("DATABASE_ENCRYPTION_KEY must be at least 32 characters long");
  }

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  return {
    encryption: {
      key: encryptionKey,
      hashSalt: hashSalt || "default-hash-salt-change-in-production",
    },
    database: {
      url: databaseUrl,
      ssl: process.env.DATABASE_SSL === "true",
    },
  };
}
