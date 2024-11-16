import express from 'express'
import upload from '../config.js/multerConfig.js';
import { addOffer, deleteOffer, editOffer, getAllOffer, getSingleOffer } from '../controllers/offer.controller.js';

const offerRoutes = express.Router()

offerRoutes.post('/addOffer',upload.single('offerImage'),addOffer);
offerRoutes.get('/getAllOffer',getAllOffer);
offerRoutes.delete('/deleteOffer/:id',deleteOffer);
offerRoutes.put('/editOffer/:id',upload.single('offerImage'),editOffer);
offerRoutes.get('/getSingleOffer/:id',getSingleOffer)

export default offerRoutes