# Environment Setup for Database Encryption

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/associhealth"

# Encryption Configuration (REQUIRED)
DATABASE_ENCRYPTION_KEY="your-32-character-minimum-encryption-key-here"

# Hash Salt (OPTIONAL but recommended)
DATABASE_HASH_SALT="your-custom-hash-salt-change-in-production"

# SSL Configuration (OPTIONAL)
DATABASE_SSL="true"
```

## Generating Secure Keys

### Encryption Key

Generate a secure 32+ character encryption key:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Hash Salt

Generate a secure hash salt:

```bash
# Using OpenSSL
openssl rand -hex 16

# Using Node.js
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## Example Configuration

```bash
# Production example
DATABASE_URL="postgresql://associhealth:secure_password@db.example.com:5432/associhealth_prod"
DATABASE_ENCRYPTION_KEY="Kx9mP2vQ8nR5tY7uI3oP6aS1dF4gH9jL2mN5qW8eR1tY4uI7oP0aS3dF6gH9j"
DATABASE_HASH_SALT="a1b2c3d4e5f6789012345678901234567890abcdef"
DATABASE_SSL="true"
```

## Security Best Practices

1. **Never commit keys to version control**
2. **Use different keys for different environments**
3. **Rotate keys periodically in production**
4. **Store keys in secure secret management systems**
5. **Use strong, random keys (minimum 32 characters)**
6. **Keep keys separate from application code**

## Validation

The encryption model will automatically validate your environment variables on startup:

```typescript
import { validateEnvironment } from "@workspace/database";

// This will throw an error if environment variables are missing or invalid
validateEnvironment();
```

## Troubleshooting

### Common Errors

1. **"DATABASE_ENCRYPTION_KEY environment variable is required"**
   - Add the `DATABASE_ENCRYPTION_KEY` to your `.env` file

2. **"DATABASE_ENCRYPTION_KEY must be at least 32 characters long"**
   - Generate a longer encryption key (minimum 32 characters)

3. **"Encryption failed"**
   - Check that your encryption key is valid and hasn't changed
   - Ensure the encrypted data wasn't corrupted

4. **"Decryption failed"**
   - Verify the encrypted data is valid
   - Check that the encryption key matches the one used for encryption
