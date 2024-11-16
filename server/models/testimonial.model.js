import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
