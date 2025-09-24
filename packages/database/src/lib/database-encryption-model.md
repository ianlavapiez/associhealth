# Database Encryption Model

This package provides comprehensive encryption utilities for protecting PHI (Protected Health Information) and sensitive data in the Associhealth database.

## 🔐 Features

- **AES-256-GCM Encryption**: Military-grade encryption for all PHI fields
- **Hash Generation**: SHA-256 hashes for exact matching without exposing data
- **JSON Encryption**: Encrypt complex objects and arrays
- **Safe Operations**: Smart encryption/decryption that handles already-encrypted data
- **Environment Validation**: Ensures proper configuration before operations
- **Philippine-Specific**: Optimized for Philippine identifier types and requirements

## 🚀 Quick Start

### Environment Setup

```bash
# Required environment variables
export DATABASE_ENCRYPTION_KEY="your-32-character-minimum-encryption-key"
export DATABASE_URL="postgresql://user:pass@localhost:5432/db"
export DATABASE_HASH_SALT="your-custom-hash-salt" # Optional but recommended
```

### Basic Usage

```typescript
import { encrypt, decrypt, hash } from "@workspace/database";

// Encrypt sensitive data
const encrypted = encrypt("John Doe");
const decrypted = decrypt(encrypted);

// Generate hash for exact matching
const emailHash = hash("user@example.com");
```

## 📋 API Reference

### Core Functions

#### `encrypt(plaintext: string): string`

Encrypts a string using AES-256-GCM with random IV and salt.

#### `decrypt(encryptedData: string): string`

Decrypts an encrypted string.

#### `hash(value: string): string`

Generates a SHA-256 hash for exact matching.

#### `hashPHI(value: string, salt?: string): string`

Generates a salted hash for PHI fields.

### JSON Functions

#### `encryptJSON(obj: any): string`

Encrypts a JSON object.

#### `decryptJSON<T>(encryptedJSON: string): T`

Decrypts a JSON object with type safety.

### Array Functions

#### `encryptArray(array: string[]): string`

Encrypts an array of strings.

#### `decryptArray(encryptedArray: string): string[]`

Decrypts an array of strings.

### Safe Functions

#### `safeEncrypt(value: string): string`

Only encrypts if the value is not already encrypted.

#### `safeDecrypt(value: string): string`

Only decrypts if the value appears to be encrypted.

#### `isEncrypted(value: string): boolean`

Checks if a value appears to be encrypted.

### Configuration

#### `validateEnvironment(): void`

Validates that all required environment variables are set.

#### `getDatabaseConfig(): DatabaseConfig`

Returns validated database configuration.

## 🏥 Healthcare-Specific Usage

### Patient Data Encryption

```typescript
import { persons } from "@workspace/database/schema";
import { encrypt, hash } from "@workspace/database";

// Create encrypted patient record
const patientData = {
  firstName: encrypt("Juan"),
  lastName: encrypt("Dela Cruz"),
  email: encrypt("juan@example.com"),
  phone: encrypt("+639171234567"),
  // Generate hashes for searching
  firstNameHash: hash("Juan"),
  lastNameHash: hash("Dela Cruz"),
  emailHash: hash("juan@example.com"),
  phoneHash: hash("+639171234567"),
};

await db.insert(persons).values(patientData);
```

### Philippine Identifier Encryption

```typescript
import { personIdentifiers } from "@workspace/database/schema";
import { encrypt, hash } from "@workspace/database";

// Encrypt Philippine identifiers
const identifierData = {
  type: "national_id",
  value: encrypt("1234-5678-9012-3456"), // PhilSys ID
  valueHash: hash("1234-5678-9012-3456"),
  issuingAuthority: "PhilSys",
  country: "PHL",
};

await db.insert(personIdentifiers).values(identifierData);
```

### FHIR Resource Encryption

```typescript
import { patientFhirResource } from "@workspace/database/schema";
import { encryptJSON, hash } from "@workspace/database";

// Encrypt FHIR Patient resource
const fhirPatient = {
  resourceType: "Patient",
  name: [{ given: ["Juan"], family: "Dela Cruz" }],
  // ... other FHIR fields
};

const encryptedData = {
  data: encryptJSON(fhirPatient),
  dataHash: hash(JSON.stringify(fhirPatient)),
};

await db.insert(patientFhirResource).values(encryptedData);
```

## 🔍 Searching Encrypted Data

Since encrypted data cannot be searched directly, use hashes for exact matching:

```typescript
import { persons } from "@workspace/database/schema";
import { hash, eq } from "@workspace/database";

// Find patient by email (exact match)
const emailHash = hash("juan@example.com");
const [patient] = await db.select().from(persons).where(eq(persons.emailHash, emailHash)).limit(1);

// Decrypt the found patient
if (patient) {
  const decryptedEmail = decrypt(patient.email);
}
```

## 🛡️ Security Best Practices

### 1. Key Management

- Use a strong, random encryption key (minimum 32 characters)
- Store keys securely (environment variables, secret management)
- Rotate keys periodically in production

### 2. Hash Salt

- Use a unique salt for hash generation
- Store salt securely and separately from data
- Change salt when rotating encryption keys

### 3. Data Handling

- Always validate environment variables before operations
- Use safe encryption/decryption for mixed data
- Never log encrypted data or keys

### 4. Performance

- Batch encryption/decryption operations when possible
- Consider caching decrypted data for frequently accessed records
- Monitor encryption/decryption performance

## 🚨 Error Handling

```typescript
import { validateEnvironment } from "@workspace/database";

try {
  validateEnvironment();
  const encrypted = encrypt("sensitive data");
} catch (error) {
  console.error("Encryption failed:", error.message);
  // Handle error appropriately
}
```

## 🔧 Configuration Options

### Custom Encryption Configuration

```typescript
import { encrypt, DEFAULT_CRYPTO_CONFIG } from "@workspace/database";

const customConfig = {
  ...DEFAULT_CRYPTO_CONFIG,
  algorithm: "aes-256-gcm", // Default
  keyLength: 32, // 256 bits
  ivLength: 16, // 128 bits
  saltLength: 16, // 128 bits
};

const encrypted = encrypt("data", customConfig);
```

## 📊 Performance Considerations

- **Encryption Overhead**: ~2-3ms per field for typical PHI data
- **Hash Generation**: ~0.1ms per field
- **JSON Operations**: Additional overhead for complex objects
- **Batch Operations**: Use batch functions for multiple fields

## 🧪 Testing

```typescript
import { encrypt, decrypt, hash } from "@workspace/database";

// Test encryption round-trip
const original = "test data";
const encrypted = encrypt(original);
const decrypted = decrypt(encrypted);
console.assert(original === decrypted, "Encryption round-trip failed");

// Test hash consistency
const hash1 = hash("test");
const hash2 = hash("test");
console.assert(hash1 === hash2, "Hash consistency failed");
```

## 🔄 Migration Guide

When migrating existing unencrypted data:

1. **Backup**: Always backup data before migration
2. **Batch Processing**: Process data in small batches
3. **Validation**: Verify encryption/decryption works correctly
4. **Rollback Plan**: Have a rollback strategy ready

```typescript
// Example migration script
async function migrateToEncryption(db: any) {
  const unencryptedRecords = await db.select().from(persons);

  for (const record of unencryptedRecords) {
    const encryptedRecord = {
      ...record,
      firstName: encrypt(record.firstName),
      lastName: encrypt(record.lastName),
      // ... encrypt other fields
    };

    await db.update(persons).set(encryptedRecord).where(eq(persons.id, record.id));
  }
}
```

## 📝 License

This encryption model is part of the Associhealth project and follows the same licensing terms.
