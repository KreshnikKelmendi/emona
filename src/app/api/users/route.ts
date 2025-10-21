import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB for users fetch');

    // Fetch all users from MongoDB, sorted by creation date (newest first)
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .lean();

    // Return users data
    return NextResponse.json({
      message: 'Users fetched successfully',
      users: users,
      count: users.length
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching users:', error instanceof Error ? error.message : error);

    // Generic error response
    return NextResponse.json({ 
      message: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}
