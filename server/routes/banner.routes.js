import express from 'express';
import { getBanners, addBanner, editBanner, getSingleBanner, deleteBanner } from '../controllers/banner.controller.js';
import upload from '../config.js/multerConfig.js';

const bannerRouter = express.Router();

// Route to get all banners
bannerRouter.get('/getAllBanners', getBanners);

// Route to add a new banner
bannerRouter.post('/addBanners',upload.single('bannerImage'), addBanner);

// Route to edit a new banner
bannerRouter.put('/editBanners/:id',upload.single('bannerImage'),editBanner);

// Route to get single banner
bannerRouter.get('/getSingleBanner/:id',getSingleBanner)

// Route to delete banner
bannerRouter.delete('/deleteBanner/:id',deleteBanner)

export default bannerRouter;
