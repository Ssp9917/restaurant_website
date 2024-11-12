import express from 'express'
import upload from '../config.js/multerConfig.js';
import { addOffer, getAllOffer } from '../controllers/offer.controller.js';

const offerRoutes = express.Router()

offerRoutes.post('/addOffer',upload.single('offerImage'),addOffer);
offerRoutes.get('/getAllOffer',getAllOffer)

export default offerRoutes