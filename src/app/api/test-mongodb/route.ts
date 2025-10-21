import { NextRequest, NextResponse } from 'next/server';
import { testMongoDBConnection } from '../../../lib/testMongoDB';

export async function POST() {
  try {
    console.log('Starting MongoDB connection test...');
    
    const result = await testMongoDBConnection();
    
    if (result.success) {
      return NextResponse.json({
        message: result.message,
        tests: result.tests
      }, { status: 200 });
    } else {
      return NextResponse.json({
        message: result.message,
        error: result.error
      }, { status: 500 });
    }
    
  } catch (error: unknown) {
    console.error('MongoDB test API error:', error);
    return NextResponse.json({
      message: 'MongoDB test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'MongoDB test endpoint. Use POST to run tests.',
    usage: 'POST /api/test-mongodb to test MongoDB connection and operations'
  }, { status: 200 });
}
