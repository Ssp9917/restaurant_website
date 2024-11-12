import express from 'express';
import cors from 'cors';
import dbConfig from './database/connectToDb.js';
import categoryRouter from './routes/category.routes.js';
import recipeRouter from './routes/recipe.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import authRouter from './routes/user.routes.js';
import bannerRouter from './routes/banner.routes.js';
import { webhookHandler } from './controllers/webhook.controller.js';
import orderRouter from './routes/order.routes.js';
import offerRoutes from './routes/offer.route.js';

const app = express();
const port = process.env.PORT || 6001;

// Webhook route - Use raw body for this specific route
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Apply express.json() AFTER the webhook route
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connect
dbConfig();

// Import routes here
app.use('/category', categoryRouter);
app.use('/recipe', recipeRouter);
app.use('/checkout', checkoutRoutes);
app.use('/auth', authRouter);
app.use('/banner', bannerRouter);
app.use('/order',orderRouter);
app.use('/offer',offerRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
