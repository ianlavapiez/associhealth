# Philippine Healthcare Identifier System

## Primary Philippine Identifiers

### **Required Identifiers (for new patients):**

1. **PhilSys ID** - Philippine Identification System (12 digits)
2. **SSS Number** - Social Security System (XX-XXXXXXX-X format)
3. **PhilHealth Number** - Health Insurance (XX-XXXXXXXXX-X format)

### **Optional Identifiers:**

- **Passport** - Philippine passport (XX1234567 format)
- **Driver's License** - LTO issued (XX12-34-123456 format)
- **TIN** - Tax Identification Number (XXX-XXX-XXX-XXX format)
- **Voter's ID** - COMELEC issued
- **Postal ID** - PHLPost issued
- **Student ID** - School/University issued
- **Employee ID** - Company issued

## Example Patient Records

### **Local Filipino Patient:**

```json
{
  "personId": "123e4567-e89b-12d3-a456-426614174000",
  "identifiers": [
    {
      "type": "national_id",
      "value": "123456789012",
      "issuingAuthority": "PSA",
      "country": "PH",
      "isValid": true,
      "metadata": {
        "philSysType": "regular",
        "registrationDate": "2023-01-15"
      }
    },
    {
      "type": "sss",
      "value": "12-3456789-0",
      "issuingAuthority": "Philippine SSS",
      "country": "PH",
      "isValid": true,
      "metadata": {
        "sssType": "regular",
        "branch": "Manila"
      }
    },
    {
      "type": "philhealth",
      "value": "12-345678901-2",
      "issuingAuthority": "PhilHealth",
      "country": "PH",
      "isValid": true,
      "metadata": {
        "membershipType": "individually_paying",
        "status": "active"
      }
    }
  ]
}
```

### **Student Patient:**

```json
{
  "personId": "456e7890-e89b-12d3-a456-426614174001",
  "identifiers": [
    {
      "type": "national_id",
      "value": "987654321098",
      "issuingAuthority": "PSA",
      "country": "PH",
      "isValid": true
    },
    {
      "type": "sss",
      "value": "98-7654321-0",
      "issuingAuthority": "Philippine SSS",
      "country": "PH",
      "isValid": true
    },
    {
      "type": "student_id",
      "value": "2023-12345",
      "issuingAuthority": "University of the Philippines",
      "country": "PH",
      "isValid": true,
      "metadata": {
        "school": "UP Diliman",
        "course": "BS Computer Science"
      }
    }
  ]
}
```

## Validation Patterns

### **PhilSys ID:**

- Format: `123456789012` (12 digits)
- Pattern: `/^\d{12}$/`
- Issuing Authority: PSA (Philippine Statistics Authority)

### **SSS Number:**

- Format: `XX-XXXXXXX-X` (2-7-1 digits with hyphens)
- Pattern: `/^\d{2}-\d{7}-\d{1}$/`
- Example: `12-3456789-0`

### **PhilHealth Number:**

- Format: `XX-XXXXXXXXX-X` (2-9-1 digits with hyphens)
- Pattern: `/^\d{2}-\d{9}-\d{1}$/`
- Example: `12-345678901-2`

### **Philippine Passport:**

- Format: `XX1234567` (2 letters + 7 digits)
- Pattern: `/^[A-Z]{2}\d{7}$/`
- Example: `XX1234567`

### **Driver's License:**

- Format: `XX12-34-123456` (2 letters + 2-2-6 digits with hyphens)
- Pattern: `/^[A-Z]{2}\d{2}-\d{2}-\d{6}$/`
- Example: `AA12-34-123456`

### **TIN (Tax ID):**

- Format: `XXX-XXX-XXX-XXX` (3-3-3-3 digits with hyphens)
- Pattern: `/^\d{3}-\d{3}-\d{3}-\d{3}$/`
- Example: `123-456-789-012`

## Patient Matching Logic

### **Primary Matching (High Confidence):**

1. **PhilSys ID** - Exact match
2. **SSS Number** - Exact match
3. **PhilHealth Number** - Exact match

### **Secondary Matching (Medium Confidence):**

1. **Passport** - Exact match
2. **Driver's License** - Exact match
3. **TIN** - Exact match

### **Tertiary Matching (Low Confidence):**

1. **Phone number** - Exact match
2. **Email address** - Exact match
3. **Demographics** - Fuzzy match (name, birthdate, address)

## Healthcare System Integration

### **PhilHealth Integration:**

- Verify membership status
- Check coverage validity
- Process claims automatically

### **SSS Integration:**

- Verify employment status
- Check contribution history
- Process disability benefits

### **PhilSys Integration:**

- Verify identity
- Check biometric data
- Prevent duplicate registrations

## Benefits for Philippine Healthcare

✅ **Compliance**: Meets PhilHealth and SSS requirements
✅ **Identity Verification**: Uses official government IDs
✅ **Fraud Prevention**: Multiple identifier validation
✅ **Interoperability**: Works with existing Philippine systems
✅ **Student Support**: Handles student patients
✅ **Employee Support**: Handles company employees
