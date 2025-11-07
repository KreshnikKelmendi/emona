import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import { compressFileUpload } from '../../../lib/compressFileUpload';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    console.log('Starting form submission...');

    // Set a timeout for the entire operation
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000); // 30 second timeout
    });

    const operationPromise = async (): Promise<Response> => {
      // Connect to MongoDB
      await connectDB();
      console.log('Connected to MongoDB');

      // Extract form data from request body
      const body = await req.json();
      console.log('Received form data:', body);
      const { fullName, phone, fileUpload } = body;

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

      const compressedFileUpload = await compressFileUpload(fileUpload);

      // Create new user document - only include required fields for now
      const newUser = new User({
        fullName,
        phone,
        fileUpload: compressedFileUpload
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
    };

    // Race between operation and timeout
    return await Promise.race([operationPromise(), timeoutPromise]);

  } catch (error: unknown) {
    console.error('Error saving user:', error);

    // Handle timeout errors
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json({ 
        message: 'Request timed out. Please try again.' 
      }, { status: 408 });
    }


    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationErrors: Record<string, string> = {};
      const validationError = error as Error & { errors: Record<string, { message: string }> };
      Object.keys(validationError.errors).forEach(key => {
        validationErrors[key] = validationError.errors[key].message;
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
