import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(req: NextRequest) {
  try {
    console.log('Starting form submission...');

    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Extract form data from request body
    const body = await req.json();
    console.log('Received form data:', body);
    const { fullName, phone, fileUpload, barcode, email, purchaseReceipt } = body;

    // Validate required fields
    if (!fullName || !phone || !fileUpload) {
      return NextResponse.json({ 
        message: 'All fields are required',
        missingFields: {
          fullName: !fullName,
          phone: !phone,
          fileUpload: !fileUpload
        }
      }, { status: 400 });
    }

    // Create new user document - only include required fields for now
    const newUser = new User({
      fullName,
      phone,
      fileUpload
    });

    // Save user to MongoDB
    const savedUser = await newUser.save();
    console.log('User saved to MongoDB:', savedUser._id);

    // Return success response
    return NextResponse.json({
      message: 'Form submitted successfully',
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        phone: savedUser.phone,
        createdAt: savedUser.createdAt
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error saving user:', error);


    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: any = {};
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      return NextResponse.json({ 
        message: 'Validation error',
        errors: validationErrors
      }, { status: 400 });
    }

    // Generic error response
    return NextResponse.json({ 
      message: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}
