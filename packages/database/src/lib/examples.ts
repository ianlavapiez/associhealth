// ======================================
// Encryption Usage Examples
// ======================================

// Note: Environment variables should be loaded by the parent process
// or set in your shell before running this script

import {
  encrypt,
  decrypt,
  hash,
  encryptJSON,
  decryptJSON,
  encryptArray,
  decryptArray,
  validateEnvironment,
} from "./crypto";

// ======================================
// Performance Testing
// ======================================

function runPerformanceTests() {
  console.log("🚀 Running encryption performance tests...\n");

  // Test basic encryption performance
  const testData = "John Doe - Sample PHI Data";
  console.log("📊 Basic Encryption Performance:");

  const encryptStart = performance.now();
  const encrypted = encrypt(testData);
  const encryptEnd = performance.now();
  console.log(`   ⚡ Encryption: ${(encryptEnd - encryptStart).toFixed(3)}ms`);

  const decryptStart = performance.now();
  const decrypted = decrypt(encrypted);
  const decryptEnd = performance.now();
  console.log(`   ⚡ Decryption: ${(decryptEnd - decryptStart).toFixed(3)}ms`);
  console.log(`   ✅ Round-trip successful: ${testData === decrypted}\n`);

  // Test JSON encryption performance
  const complexData = {
    name: "Juan Dela Cruz",
    age: 30,
    address: "123 Main St, Manila, Philippines",
    contacts: ["+639171234567", "+639171234568"],
    metadata: { verified: true, lastUpdate: new Date().toISOString() },
  };

  console.log("📊 JSON Encryption Performance:");
  const jsonEncryptStart = performance.now();
  const encryptedJSON = encryptJSON(complexData);
  const jsonEncryptEnd = performance.now();
  console.log(`   ⚡ JSON Encryption: ${(jsonEncryptEnd - jsonEncryptStart).toFixed(3)}ms`);

  const jsonDecryptStart = performance.now();
  const decryptedJSON = decryptJSON(encryptedJSON);
  const jsonDecryptEnd = performance.now();
  console.log(`   ⚡ JSON Decryption: ${(jsonDecryptEnd - jsonDecryptStart).toFixed(3)}ms`);
  console.log(
    `   ✅ JSON Round-trip successful: ${JSON.stringify(complexData) === JSON.stringify(decryptedJSON)}\n`
  );

  // Test hash performance
  const hashStart = performance.now();
  const emailHash = hash("juan.delacruz@email.com");
  const hashEnd = performance.now();
  console.log("📊 Hash Generation Performance:");
  console.log(`   ⚡ Hash generation: ${(hashEnd - hashStart).toFixed(3)}ms`);
  console.log(`   📋 Hash length: ${emailHash.length} characters\n`);

  // Test bulk operations
  const bulkData = Array.from({ length: 100 }, (_, i) => `Sample data ${i}`);
  console.log("📊 Bulk Operations Performance (100 items):");

  const bulkEncryptStart = performance.now();
  const bulkEncrypted = batchEncrypt(bulkData);
  const bulkEncryptEnd = performance.now();
  console.log(
    `   ⚡ Bulk encryption: ${(bulkEncryptEnd - bulkEncryptStart).toFixed(3)}ms (${((bulkEncryptEnd - bulkEncryptStart) / 100).toFixed(3)}ms per item)`
  );

  const bulkDecryptStart = performance.now();
  const bulkDecrypted = batchDecrypt(bulkEncrypted);
  const bulkDecryptEnd = performance.now();
  console.log(
    `   ⚡ Bulk decryption: ${(bulkDecryptEnd - bulkDecryptStart).toFixed(3)}ms (${((bulkDecryptEnd - bulkDecryptStart) / 100).toFixed(3)}ms per item)`
  );
  console.log(
    `   ✅ Bulk round-trip successful: ${JSON.stringify(bulkData) === JSON.stringify(bulkDecrypted)}\n`
  );

  console.log("🎉 Performance tests completed!\n");
}

// ======================================
// Database Integration Examples
// ======================================

// Example: Creating a person record with encrypted data
function createEncryptedPersonData(personData: Record<string, unknown>) {
  // Encrypt PHI fields
  const encryptedData = {
    firstName: encrypt(String(personData.firstName || "")),
    lastName: encrypt(String(personData.lastName || "")),
    middleName: encrypt(String(personData.middleName || "")),
    email: encrypt(String(personData.email || "")),
    phone: encrypt(String(personData.phone || "")),
    address: encrypt(String(personData.address || "")),
    birthdate: encrypt(String(personData.birthdate || "")),
    gender: encrypt(String(personData.gender || "")),
    nationality: encrypt(String(personData.nationality || "")),
    occupation: encrypt(String(personData.occupation || "")),
    religion: encrypt(String(personData.religion || "")),
    // Encrypt JSON fields
    phones: encryptArray(Array.isArray(personData.phones) ? personData.phones : []),
    emails: encryptArray(Array.isArray(personData.emails) ? personData.emails : []),
    demographics: encryptJSON(personData.demographics || {}),
    // Generate hashes for searching
    firstNameHash: hash(String(personData.firstName || "")),
    lastNameHash: hash(String(personData.lastName || "")),
    emailHash: hash(String(personData.email || "")),
    phoneHash: hash(String(personData.phone || "")),
  };

  return encryptedData;
}

// Example: Decrypting person data
function decryptPersonData(person: Record<string, unknown>) {
  // Decrypt PHI fields
  const decryptedPerson = {
    id: person.id,
    firstName: decrypt(String(person.firstName || "")),
    lastName: decrypt(String(person.lastName || "")),
    middleName: decrypt(String(person.middleName || "")),
    email: decrypt(String(person.email || "")),
    phone: decrypt(String(person.phone || "")),
    address: decrypt(String(person.address || "")),
    birthdate: decrypt(String(person.birthdate || "")),
    gender: decrypt(String(person.gender || "")),
    nationality: decrypt(String(person.nationality || "")),
    occupation: decrypt(String(person.occupation || "")),
    religion: decrypt(String(person.religion || "")),
    // Decrypt JSON fields
    phones: decryptArray(String(person.phones || "")),
    emails: decryptArray(String(person.emails || "")),
    demographics: decryptJSON(String(person.demographics || "")),
    // Keep metadata fields as-is
    createdAt: person.createdAt,
    updatedAt: person.updatedAt,
  };

  return decryptedPerson;
}

// Example: Searching by hash (exact match)
function createSearchHash(email: string) {
  return hash(email);
}

// For bulk operations, consider batching encryption/decryption
function batchEncrypt(values: string[]): string[] {
  return values.map((value) => encrypt(value));
}

function batchDecrypt(values: string[]): string[] {
  return values.map((value) => decrypt(value));
}

// ======================================
// Main Execution
// ======================================

function main() {
  try {
    console.log("🔐 Associhealth Encryption Model Examples\n");

    // Validate environment
    console.log("🔧 Validating environment...");
    validateEnvironment();
    console.log("✅ Environment validation passed\n");

    // Run performance tests
    runPerformanceTests();

    // Show example usage
    console.log("📋 Example Usage:");
    const sampleData = {
      firstName: "Juan",
      lastName: "Dela Cruz",
      email: "juan@example.com",
      phone: "+639171234567",
    };

    console.log("   📝 Original data:", sampleData);
    const encryptStart = performance.now();
    const encrypted = createEncryptedPersonData(sampleData);
    const encryptEnd = performance.now();
    console.log(`   🔒 Data encrypted: ${(encryptEnd - encryptStart).toFixed(3)}ms`);

    const decryptStart = performance.now();
    const decrypted = decryptPersonData(encrypted);
    const decryptEnd = performance.now();
    console.log(`   🔓 Data decrypted: ${(decryptEnd - decryptStart).toFixed(3)}ms`);
    console.log(
      `   ✅ Round-trip verification: ${JSON.stringify(sampleData) === JSON.stringify(decrypted)}\n`
    );

    console.log("🎉 All examples completed successfully!");
  } catch (error) {
    console.error("❌ Error running examples:", error);
    process.exit(1);
  }
}

// Export examples for use in other modules
export {
  createEncryptedPersonData,
  decryptPersonData,
  createSearchHash,
  batchEncrypt,
  batchDecrypt,
  runPerformanceTests,
  main,
};

// Run main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
