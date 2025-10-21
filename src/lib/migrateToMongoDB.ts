import fs from 'fs';
import path from 'path';
import connectDB from './mongodb';
import User from '../models/User';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function migrateUsersToMongoDB() {
  try {
    console.log('Starting migration to MongoDB...');
    
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if JSON file exists
    if (!fs.existsSync(DATA_FILE)) {
      console.log('No users.json file found. Nothing to migrate.');
      return { success: true, message: 'No data to migrate', migrated: 0 };
    }

    // Read existing users from JSON file
    const jsonData = fs.readFileSync(DATA_FILE, 'utf8');
    const users = JSON.parse(jsonData);
    
    if (!Array.isArray(users) || users.length === 0) {
      console.log('No users found in JSON file.');
      return { success: true, message: 'No users to migrate', migrated: 0 };
    }

    console.log(`Found ${users.length} users to migrate`);

    // Check if users already exist in MongoDB
    const existingUsersCount = await User.countDocuments();
    if (existingUsersCount > 0) {
      console.log(`MongoDB already contains ${existingUsersCount} users. Skipping migration to avoid duplicates.`);
      return { 
        success: true, 
        message: 'Migration skipped - MongoDB already contains users', 
        existing: existingUsersCount,
        jsonUsers: users.length
      };
    }

    // Transform and save users to MongoDB
    const migratedUsers = [];
    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Create new user document with proper field mapping
        const newUser = new User({
          fullName: user.fullName,
          phone: user.phone,
          fileUpload: user.fileUpload,
          barcode: user.barcode || undefined,
          email: user.email || undefined,
          purchaseReceipt: user.purchaseReceipt || undefined,
          // Preserve original timestamps if they exist
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
          updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date()
        });

        const savedUser = await newUser.save();
        migratedUsers.push(savedUser._id);
        successCount++;
        
        console.log(`Migrated user: ${user.fullName} (${user.phone})`);
      } catch (error) {
        console.error(`Error migrating user ${user.fullName}:`, error);
        errorCount++;
      }
    }

    console.log(`Migration completed! Success: ${successCount}, Errors: ${errorCount}`);

    return {
      success: true,
      message: 'Migration completed successfully',
      migrated: successCount,
      errors: errorCount,
      total: users.length
    };

  } catch (error) {
    console.error('Migration failed:', error);
    return {
      success: false,
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Function to run migration from command line or API
export async function runMigration() {
  const result = await migrateUsersToMongoDB();
  console.log('Migration result:', result);
  return result;
}
