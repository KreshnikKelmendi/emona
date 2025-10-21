import { NextRequest, NextResponse } from 'next/server';
import { migrateUsersToMongoDB } from '../../../lib/migrateToMongoDB';

export async function POST() {
  try {
    console.log('Starting migration process...');
    
    const result = await migrateUsersToMongoDB();
    
    if (result.success) {
      return NextResponse.json({
        message: result.message,
        migrated: result.migrated || 0,
        errors: result.errors || 0,
        total: result.total || 0,
        existing: result.existing || 0
      }, { status: 200 });
    } else {
      return NextResponse.json({
        message: result.message,
        error: result.error
      }, { status: 500 });
    }
    
  } catch (error: unknown) {
    console.error('Migration API error:', error);
    return NextResponse.json({
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint. Use POST to run migration.',
    usage: 'POST /api/migrate to migrate JSON data to MongoDB'
  }, { status: 200 });
}
