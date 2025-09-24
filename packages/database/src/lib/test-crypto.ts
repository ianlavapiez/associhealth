// ======================================
// Encryption Model Tests - Simplified
// ======================================

// Load environment variables from database package directory
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file from database package directory (2 levels up from this file)
config({ path: resolve(import.meta.dirname, "../../.env") });

// Import the comprehensive performance tests from examples.ts
import { runPerformanceTests } from "./examples";

// ======================================
// Run All Tests
// ======================================

function runAllTests() {
  console.log("🚀 Starting encryption model tests...\n");

  try {
    // Use the comprehensive performance tests from examples.ts
    runPerformanceTests();

    console.log("\n🎉 All encryption model tests passed!");
    console.log("✅ Encryption model is ready for production use");
  } catch (error) {
    console.error("\n❌ Tests failed:", error);
    process.exit(1);
  }
}

// Export for use in other modules
export { runAllTests };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}
