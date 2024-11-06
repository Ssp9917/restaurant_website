import express from 'express';
import { createPaymentIntent } from '../controllers/checkout.controller.js';

const checkoutRoutes = express.Router();

checkoutRoutes.post('/create-checkout-session', createPaymentIntent);

export default checkoutRoutes;