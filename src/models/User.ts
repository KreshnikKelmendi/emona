import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  phone: string;
  fileUpload: string; // Store file path or base64
  barcode?: string;
  email?: string;
  purchaseReceipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot be more than 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot be more than 20 characters']
  },
  fileUpload: {
    type: String,
    required: [true, 'File upload is required'],
    trim: true
  },
  // Keep old fields for compatibility but make them optional
  barcode: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  purchaseReceipt: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  // Remove any unique constraints
  _id: true
});

// Add indexes for better query performance
UserSchema.index({ createdAt: -1 });
UserSchema.index({ phone: 1 });
// Removed email index to avoid unique constraint issues

// Create the model with a new collection name to avoid existing indexes
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'users_new');

export default User;
