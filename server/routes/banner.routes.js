import express from 'express';
import { getBanners, addBanner } from '../controllers/banner.controller.js';
import upload from '../config.js/multerConfig.js';

const bannerRouter = express.Router();

// Route to get all banners
bannerRouter.get('/getAllBanners', getBanners);

// Route to add a new banner
bannerRouter.post('/addBanners',upload.single('bannerImage'), addBanner);

export default bannerRouter;
