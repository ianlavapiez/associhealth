// Web Crypto API imports - no need to import crypto module
// All operations use the global crypto.subtle API

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
async function deriveKey(masterKey: string, salt: Uint8Array): Promise<CryptoKey> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  // Import the master key as a CryptoKey
  const masterKeyData = new TextEncoder().encode(masterKey);
  const masterKeyCryptoKey = await crypto.subtle.importKey("raw", masterKeyData, "PBKDF2", false, [
    "deriveBits",
    "deriveKey",
  ]);

  // Derive the key using PBKDF2
  const saltBuffer = salt.slice().buffer;
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000, // Standard PBKDF2 iteration count
      hash: "SHA-256",
    },
    masterKeyCryptoKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );

  return derivedKey;
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
 * Generates random bytes using Web Crypto API
 */
function getRandomBytes(length: number): Uint8Array {
  if (typeof crypto === "undefined" || !crypto.getRandomValues) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  return crypto.getRandomValues(new Uint8Array(length));
}

/**
 * Encrypts a string value using AES-256-GCM
 * @param plaintext - The string to encrypt
 * @param config - Encryption configuration (optional)
 * @returns Base64 encoded encrypted data with salt and IV
 */
export async function encrypt(
  plaintext: string,
  config: CryptoConfig = DEFAULT_CRYPTO_CONFIG
): Promise<string> {
  if (!plaintext) {
    return plaintext;
  }

  try {
    if (typeof crypto === "undefined" || !crypto.subtle) {
      throw new Error("Web Crypto API is not available in this environment");
    }

    const masterKey = getMasterKey();
    const salt = new Uint8Array(getRandomBytes(config.saltLength));
    const iv = new Uint8Array(getRandomBytes(config.ivLength));
    const key = await deriveKey(masterKey, salt);

    // Convert plaintext to buffer
    const plaintextBuffer = new TextEncoder().encode(plaintext);

    // Generate random IV and encrypt
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      plaintextBuffer
    );

    // Combine salt + iv + encrypted data
    const saltArray = new Uint8Array(salt);
    const ivArray = new Uint8Array(iv);
    const encryptedArray = new Uint8Array(encryptedBuffer);

    const combined = new Uint8Array(saltArray.length + ivArray.length + encryptedArray.length);
    combined.set(saltArray, 0);
    combined.set(ivArray, saltArray.length);
    combined.set(encryptedArray, saltArray.length + ivArray.length);

    // Convert to base64
    return btoa(String.fromCharCode(...combined));
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
export async function decrypt(
  encryptedData: string,
  config: CryptoConfig = DEFAULT_CRYPTO_CONFIG
): Promise<string> {
  if (!encryptedData) {
    return encryptedData;
  }

  try {
    if (typeof crypto === "undefined" || !crypto.subtle) {
      throw new Error("Web Crypto API is not available in this environment");
    }

    const masterKey = getMasterKey();

    // Decode base64
    const combinedByteString = atob(encryptedData);
    const combined = new Uint8Array(combinedByteString.length);
    for (let i = 0; i < combinedByteString.length; i++) {
      combined[i] = combinedByteString.charCodeAt(i);
    }

    // Extract components
    const salt = combined.slice(0, config.saltLength);
    const iv = combined.slice(config.saltLength, config.saltLength + config.ivLength);
    const encrypted = combined.slice(config.saltLength + config.ivLength);

    const key = await deriveKey(masterKey, salt);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(iv),
      },
      key,
      new Uint8Array(encrypted)
    );

    // Convert back to string
    const decryptedArray = new Uint8Array(decryptedBuffer);
    return new TextDecoder().decode(decryptedArray);
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
export async function hash(value: string): Promise<string> {
  if (!value) {
    return "";
  }

  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  const normalizedValue = value.toLowerCase().trim();
  const data = new TextEncoder().encode(normalizedValue);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hashBuffer);

  // Convert to hex string
  return Array.from(hashArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generates a hash for PHI fields (with salt for additional security)
 * @param value - The PHI value to hash
 * @param salt - Optional salt for additional security
 * @returns Hex encoded hash string
 */
export async function hashPHI(value: string, salt?: string): Promise<string> {
  if (!value) {
    return "";
  }

  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment");
  }

  const normalizedValue = value.toLowerCase().trim();
  const saltValue = salt || process.env.DATABASE_HASH_SALT || "default-salt";

  // Concatenate value and salt before hashing
  const data = new TextEncoder().encode(normalizedValue + saltValue);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hashBuffer);

  // Convert to hex string
  return Array.from(hashArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ======================================
// JSON Encryption Helpers
// ======================================

/**
 * Encrypts a JSON object
 * @param obj - The object to encrypt
 * @returns Encrypted JSON string
 */
export async function encryptJSON(obj: unknown): Promise<string> {
  if (!obj) {
    return "";
  }

  return await encrypt(JSON.stringify(obj));
}

/**
 * Decrypts a JSON object
 * @param encryptedJSON - The encrypted JSON string
 * @returns Decrypted object
 */
export async function decryptJSON<T = unknown>(encryptedJSON: string): Promise<T | null> {
  if (!encryptedJSON) {
    return null;
  }

  try {
    const decrypted = await decrypt(encryptedJSON);
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
export async function encryptArray(array: string[]): Promise<string> {
  if (!array || array.length === 0) {
    return "";
  }

  return await encrypt(JSON.stringify(array));
}

/**
 * Decrypts an array of strings
 * @param encryptedArray - The encrypted array string
 * @returns Decrypted string array
 */
export async function decryptArray(encryptedArray: string): Promise<string[]> {
  if (!encryptedArray) {
    return [];
  }

  try {
    const decrypted = await decrypt(encryptedArray);
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
    const combinedByteString = atob(value);
    const decoded = new Uint8Array(combinedByteString.length);
    for (let i = 0; i < combinedByteString.length; i++) {
      decoded[i] = combinedByteString.charCodeAt(i);
    }

    // Check minimum length (salt + iv + some data)
    const minLength = DEFAULT_CRYPTO_CONFIG.saltLength + DEFAULT_CRYPTO_CONFIG.ivLength + 1;
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
export async function safeEncrypt(value: string): Promise<string> {
  if (!value || isEncrypted(value)) {
    return value;
  }

  return await encrypt(value);
}

/**
 * Safely decrypts a value only if it appears to be encrypted
 * @param value - The value to decrypt
 * @returns Decrypted value
 */
export async function safeDecrypt(value: string): Promise<string> {
  if (!value || !isEncrypted(value)) {
    return value;
  }

  return await decrypt(value);
}
