import connectDB from './mongodb';
import User from '../models/User';

export async function testMongoDBConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connection successful');

    // Test creating a user
    const testUser = new User({
      fullName: 'Test User',
      phone: '1234567890',
      fileUpload: 'test-file-data',
      email: 'test@example.com'
    });

    const savedUser = await testUser.save();
    console.log('✅ User creation test successful:', savedUser._id);

    // Test finding users
    const users = await User.find({}).sort({ createdAt: -1 }).limit(5);
    console.log('✅ User retrieval test successful. Found', users.length, 'users');

    // Clean up test user
    await User.findByIdAndDelete(savedUser._id);
    console.log('✅ Test user cleanup successful');

    return {
      success: true,
      message: 'All MongoDB tests passed',
      tests: {
        connection: true,
        create: true,
        read: true,
        delete: true
      }
    };

  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
    return {
      success: false,
      message: 'MongoDB test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Function to run tests from command line or API
export async function runTests() {
  const result = await testMongoDBConnection();
  console.log('Test result:', result);
  return result;
}
