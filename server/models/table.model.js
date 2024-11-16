import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true, // Ensure no two tables have the same number
  },
  capacity: {
    type: Number,
    required: true, // Number of people the table can accommodate
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking', // Reference to the Booking model
    },
  ],
  status: {
    type: String,
    enum: ['available', 'booked', 'reserved'], // Table-specific status
    default: 'available',
  },
}, { timestamps: true });

export default mongoose.model('Table', tableSchema);
