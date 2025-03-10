import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            name: String,
            image: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentIntentId: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    status:{
        type:String,
        enum:['pending','in-progress','delivered',"cancel"],
        default:'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Order', orderSchema);
