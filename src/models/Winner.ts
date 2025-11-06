import mongoose, { Schema, Document } from 'mongoose';

export interface IWinner extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  phone: string;
  prizeId: number;
  prizeName: string;
  prizeImage: string;
  quantity: number; // Sa sasi janë dhënë për këtë fitues
  totalQuantity: number; // Sa sasi totale ka çmimi (p.sh. 10 paketime caji)
  createdAt: Date;
  updatedAt: Date;
}

const WinnerSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  prizeId: {
    type: Number,
    required: [true, 'Prize ID is required']
  },
  prizeName: {
    type: String,
    required: [true, 'Prize name is required'],
    trim: true
  },
  prizeImage: {
    type: String,
    required: [true, 'Prize image is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  totalQuantity: {
    type: Number,
    required: [true, 'Total quantity is required'],
    min: [1, 'Total quantity must be at least 1']
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
WinnerSchema.index({ createdAt: -1 });
WinnerSchema.index({ prizeId: 1 });
WinnerSchema.index({ userId: 1 });

const Winner = mongoose.models.Winner || mongoose.model<IWinner>('Winner', WinnerSchema);

export default Winner;

