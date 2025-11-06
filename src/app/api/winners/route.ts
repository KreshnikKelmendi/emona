import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Winner from '../../../models/Winner';

// GET - Fetch all winners
export async function GET() {
  try {
    await connectDB();
    console.log('Connected to MongoDB for winners fetch');

    // Fetch all winners, sorted by creation date (newest first)
    const winners = await Winner.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      message: 'Winners fetched successfully',
      winners: winners,
      count: winners.length
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching winners:', error instanceof Error ? error.message : error);

    return NextResponse.json({ 
      message: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}

// POST - Save a new winner
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log('Connected to MongoDB for winner save');

    const body = await req.json();
    const { userId, fullName, phone, prizeId, prizeName, prizeImage, quantity, totalQuantity } = body;

    // Validate required fields
    if (!userId || !fullName || !phone || !prizeId || !prizeName || !prizeImage || !quantity || !totalQuantity) {
      return NextResponse.json({ 
        message: 'All fields are required',
        missingFields: {
          userId: !userId,
          fullName: !fullName,
          phone: !phone,
          prizeId: !prizeId,
          prizeName: !prizeName,
          prizeImage: !prizeImage,
          quantity: !quantity,
          totalQuantity: !totalQuantity
        }
      }, { status: 400 });
    }

    // Create new winner document
    const newWinner = new Winner({
      userId,
      fullName,
      phone,
      prizeId,
      prizeName,
      prizeImage,
      quantity,
      totalQuantity
    });

    // Save winner to MongoDB
    const savedWinner = await newWinner.save();
    console.log('Winner saved to MongoDB:', savedWinner._id);

    return NextResponse.json({
      message: 'Winner saved successfully',
      winner: {
        id: savedWinner._id,
        fullName: savedWinner.fullName,
        prizeName: savedWinner.prizeName,
        quantity: savedWinner.quantity,
        createdAt: savedWinner.createdAt
      }
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Error saving winner:', error);

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

    return NextResponse.json({ 
      message: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}

// DELETE - Delete winner(s)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    console.log('Connected to MongoDB for winner deletion');

    const { searchParams } = new URL(req.url);
    const winnerId = searchParams.get('id');
    const prizeId = searchParams.get('prizeId');

    // Delete single winner by ID
    if (winnerId) {
      const deletedWinner = await Winner.findByIdAndDelete(winnerId);
      
      if (!deletedWinner) {
        return NextResponse.json({ 
          message: 'Winner not found' 
        }, { status: 404 });
      }

      console.log('Winner deleted from MongoDB:', winnerId);
      return NextResponse.json({
        message: 'Winner deleted successfully',
        deletedId: winnerId
      }, { status: 200 });
    }

    // Delete all winners for a specific prize
    if (prizeId) {
      const prizeIdNum = parseInt(prizeId);
      if (isNaN(prizeIdNum)) {
        return NextResponse.json({ 
          message: 'Invalid prize ID' 
        }, { status: 400 });
      }

      const result = await Winner.deleteMany({ prizeId: prizeIdNum });
      console.log(`Deleted ${result.deletedCount} winners for prize ${prizeId}`);

      return NextResponse.json({
        message: `Deleted ${result.deletedCount} winners for prize ${prizeId}`,
        deletedCount: result.deletedCount
      }, { status: 200 });
    }

    // If no parameters, delete all winners
    const result = await Winner.deleteMany({});
    console.log(`Deleted all ${result.deletedCount} winners`);

    return NextResponse.json({
      message: `Deleted all ${result.deletedCount} winners`,
      deletedCount: result.deletedCount
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error deleting winner:', error);

    return NextResponse.json({ 
      message: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}

