import { model, Schema, Types } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  oldPrice: {
    type: Number,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,  // Assuming discount is a percentage (0-100)
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,  // Assuming rating is a value between 0 and 5
    default: 0,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before each save
recipeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Recipe = model('Recipe', recipeSchema);
export default Recipe;
