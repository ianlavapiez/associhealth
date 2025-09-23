export * from "./patient-types";

// Re-export database types for convenience
export type { IdentifierType, AccessStatus, IdentifierConfig } from "@workspace/database";
export {
  IDENTIFIER_CONFIGS,
  getIdentifierConfig,
  validateIdentifierValue,
  getIdentifierTypesByCountry,
  getRequiredIdentifierTypes,
} from "@workspace/database";
