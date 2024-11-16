import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  person: {
    type: String,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  tableNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
