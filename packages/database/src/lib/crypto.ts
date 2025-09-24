import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  type CipherGCM,
  type DecipherGCM,
} from "crypto";

// ======================================
// Encryption Configuration
// ======================================

export interface CryptoConfig {
  algorithm: string;
  keyLength: number;
  ivLength: number;
  saltLength: number;
}

export const DEFAULT_CRYPTO_CONFIG: CryptoConfig = {
  algorithm: "aes-256-gcm",
  keyLength: 32, // 256 bits
  ivLength: 16, // 128 bits
  saltLength: 16, // 128 bits
};

// ======================================
// Key Management
// ======================================

/**
 * Derives a key from a master key and salt using PBKDF2
 */
function deriveKey(masterKey: string, salt: Buffer): Buffer {
  return createHash("sha256").update(masterKey).update(salt).digest();
}

/**
 * Gets the master encryption key from environment variables
 */
function getMasterKey(): string {
  const masterKey = process.env.DATABASE_ENCRYPTION_KEY;
  if (!masterKey) {
    throw new Error("DATABASE_ENCRYPTION_KEY environment variable is required for encryption");
  }
  if (masterKey.length < 32) {
    throw new Error("DATABASE_ENCRYPTION_KEY must be at least 32 characters long");
  }
  return masterKey;
}

// ======================================
// Encryption Functions
// ======================================

/**
 * Encrypts a string value using AES-256-GCM
 * @param plaintext - The string to encrypt
 * @param config - Encryption configuration (optional)
 * @returns Base64 encoded encrypted data with salt and IV
 */
export function encrypt(plaintext: string, config: CryptoConfig = DEFAULT_CRYPTO_CONFIG): string {
  if (!plaintext) {
    return plaintext;
  }

  try {
    const masterKey = getMasterKey();
    const salt = randomBytes(config.saltLength);
    const iv = randomBytes(config.ivLength);
    const key = deriveKey(masterKey, salt);

    const cipher = createCipheriv(config.algorithm, key, iv) as CipherGCM;

    let encrypted = cipher.update(plaintext, "utf8", "base64");
    encrypted += cipher.final("base64");

    const authTag = cipher.getAuthTag();

    // Combine salt + iv + authTag + encrypted data
    const combined = Buffer.concat([salt, iv, authTag, Buffer.from(encrypted, "base64")]);

    return combined.toString("base64");
  } catch (error) {
    throw new Error(
      `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Decrypts a string value using AES-256-GCM
 * @param encryptedData - Base64 encoded encrypted data
 * @param config - Encryption configuration (optional)
 * @returns Decrypted plaintext string
 */
export function decrypt(
  encryptedData: string,
  config: CryptoConfig = DEFAULT_CRYPTO_CONFIG
): string {
  if (!encryptedData) {
    return encryptedData;
  }

  try {
    const masterKey = getMasterKey();
    const combined = Buffer.from(encryptedData, "base64");

    // Extract components
    const salt = combined.subarray(0, config.saltLength);
    const iv = combined.subarray(config.saltLength, config.saltLength + config.ivLength);
    const authTag = combined.subarray(
      config.saltLength + config.ivLength,
      config.saltLength + config.ivLength + 16
    );
    const encrypted = combined.subarray(config.saltLength + config.ivLength + 16);

    const key = deriveKey(masterKey, salt);

    const decipher = createDecipheriv(config.algorithm, key, iv) as DecipherGCM;
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    throw new Error(
      `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// ======================================
// Hash Functions
// ======================================

/**
 * Generates a SHA-256 hash for exact matching
 * @param value - The value to hash
 * @returns Hex encoded hash string
 */
export function hash(value: string): string {
  if (!value) {
    return "";
  }

  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

/**
 * Generates a hash for PHI fields (with salt for additional security)
 * @param value - The PHI value to hash
 * @param salt - Optional salt for additional security
 * @returns Hex encoded hash string
 */
export function hashPHI(value: string, salt?: string): string {
  if (!value) {
    return "";
  }

  const normalizedValue = value.toLowerCase().trim();
  const saltValue = salt || process.env.DATABASE_HASH_SALT || "default-salt";

  return createHash("sha256").update(normalizedValue).update(saltValue).digest("hex");
}

// ======================================
// JSON Encryption Helpers
// ======================================

/**
 * Encrypts a JSON object
 * @param obj - The object to encrypt
 * @returns Encrypted JSON string
 */
export function encryptJSON(obj: unknown): string {
  if (!obj) {
    return "";
  }

  return encrypt(JSON.stringify(obj));
}

/**
 * Decrypts a JSON object
 * @param encryptedJSON - The encrypted JSON string
 * @returns Decrypted object
 */
export function decryptJSON<T = unknown>(encryptedJSON: string): T | null {
  if (!encryptedJSON) {
    return null;
  }

  try {
    const decrypted = decrypt(encryptedJSON);
    return JSON.parse(decrypted) as T;
  } catch (error) {
    throw new Error(
      `JSON decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// ======================================
// Array Encryption Helpers
// ======================================

/**
 * Encrypts an array of strings
 * @param array - The array to encrypt
 * @returns Encrypted array string
 */
export function encryptArray(array: string[]): string {
  if (!array || array.length === 0) {
    return "";
  }

  return encrypt(JSON.stringify(array));
}

/**
 * Decrypts an array of strings
 * @param encryptedArray - The encrypted array string
 * @returns Decrypted string array
 */
export function decryptArray(encryptedArray: string): string[] {
  if (!encryptedArray) {
    return [];
  }

  try {
    const decrypted = decrypt(encryptedArray);
    return JSON.parse(decrypted);
  } catch (error) {
    throw new Error(
      `Array decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// ======================================
// Validation Helpers
// ======================================

/**
 * Validates environment variables for encryption
 */
export function validateEnvironment(): void {
  const requiredVars = ["DATABASE_ENCRYPTION_KEY", "DATABASE_URL"];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  // Validate encryption key strength
  const encryptionKey = process.env.DATABASE_ENCRYPTION_KEY!;
  if (encryptionKey.length < 32) {
    throw new Error("DATABASE_ENCRYPTION_KEY must be at least 32 characters long");
  }

  // Warn about default hash salt
  if (!process.env.DATABASE_HASH_SALT) {
    console.warn("⚠️  DATABASE_HASH_SALT not set, using default salt. Change this in production!");
  }
}

/**
 * Validates if a string is properly encrypted
 * @param value - The value to validate
 * @returns True if the value appears to be encrypted
 */
export function isEncrypted(value: string): boolean {
  if (!value) {
    return false;
  }

  try {
    // Check if it's valid base64
    const decoded = Buffer.from(value, "base64");

    // Check minimum length (salt + iv + authTag + some data)
    const minLength = DEFAULT_CRYPTO_CONFIG.saltLength + DEFAULT_CRYPTO_CONFIG.ivLength + 16 + 1;
    return decoded.length >= minLength;
  } catch {
    return false;
  }
}

/**
 * Safely encrypts a value only if it's not already encrypted
 * @param value - The value to encrypt
 * @returns Encrypted value
 */
export function safeEncrypt(value: string): string {
  if (!value || isEncrypted(value)) {
    return value;
  }

  return encrypt(value);
}

/**
 * Safely decrypts a value only if it appears to be encrypted
 * @param value - The value to decrypt
 * @returns Decrypted value
 */
export function safeDecrypt(value: string): string {
  if (!value || !isEncrypted(value)) {
    return value;
  }

  return decrypt(value);
}
