# MongoDB Migration Guide

This guide explains how to migrate your application from file-based storage to MongoDB.

## Overview

Your application has been updated to use MongoDB instead of JSON file storage for user data. All form submissions and user data will now be saved to your MongoDB database.

## What Changed

### 1. API Routes Updated
- **`/api/submit-form`**: Now saves to MongoDB instead of JSON file
- **`/api/users`**: Now fetches from MongoDB instead of JSON file
- **`/api/migrate`**: New endpoint to migrate existing JSON data to MongoDB
- **`/api/test-mongodb`**: New endpoint to test MongoDB connection

### 2. User Model Enhanced
- Added email validation
- Added database indexes for better performance
- Maintains all existing fields: `fullName`, `phone`, `fileUpload`, `barcode`, `email`, `purchaseReceipt`

### 3. Migration Tools
- Automatic migration script to transfer existing JSON data
- Test utilities to verify MongoDB connectivity

## Setup Instructions

### 1. Environment Variables
Make sure you have your MongoDB connection string in your `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/your-database-name
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database-name
```

### 2. Install Dependencies
Make sure you have mongoose installed:

```bash
npm install mongoose
```

### 3. Test MongoDB Connection
Test your MongoDB connection by making a POST request to:
```
POST /api/test-mongodb
```

This will verify:
- Database connection
- User creation
- User retrieval
- User deletion

### 4. Migrate Existing Data
If you have existing data in `data/users.json`, migrate it to MongoDB:

```
POST /api/migrate
```

This will:
- Read all users from the JSON file
- Transfer them to MongoDB
- Preserve all original data and timestamps
- Skip migration if MongoDB already contains users (to avoid duplicates)

## API Endpoints

### Submit Form
```
POST /api/submit-form
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": "1234567890",
  "fileUpload": "base64-encoded-file-data",
  "barcode": "optional-barcode",
  "email": "optional@email.com",
  "purchaseReceipt": "optional-receipt-data"
}
```

### Get Users
```
GET /api/users
```

Returns all users sorted by creation date (newest first).

### Test MongoDB
```
POST /api/test-mongodb
```

Tests MongoDB connection and basic operations.

### Migrate Data
```
POST /api/migrate
```

Migrates existing JSON data to MongoDB.

## Data Structure

Each user document in MongoDB contains:

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  phone: String (required),
  fileUpload: String (required),
  barcode: String (optional),
  email: String (optional, validated),
  purchaseReceipt: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Benefits of MongoDB

1. **Scalability**: Handle large amounts of data efficiently
2. **Performance**: Indexed queries for faster data retrieval
3. **Reliability**: ACID transactions and data consistency
4. **Flexibility**: Easy to add new fields and modify schema
5. **Backup**: Built-in backup and replication features

## Troubleshooting

### Connection Issues
- Verify your `MONGODB_URI` environment variable
- Check if MongoDB server is running
- Verify network connectivity to MongoDB

### Migration Issues
- Ensure JSON file exists at `data/users.json`
- Check file permissions
- Verify JSON format is valid

### Performance Issues
- Database indexes are automatically created
- Consider adding more indexes based on your query patterns

## Rollback (if needed)

If you need to rollback to file storage:

1. Revert the API route changes
2. Restore the original `fileStorage.ts` imports
3. Your JSON data will still be available in `data/users.json`

## Support

If you encounter any issues:
1. Check the server logs for detailed error messages
2. Test MongoDB connection using `/api/test-mongodb`
3. Verify environment variables are set correctly
