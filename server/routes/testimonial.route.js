import express from 'express';
import { addTestimonial, deleteTestimonial, editTestimonial, getTestimonialById, getTestimonials } from '../controllers/testimonial.controller.js';
import upload from '../config.js/multerConfig.js';

const testimonialRoutes = express.Router();

// Route to add a testimonial
testimonialRoutes.post('/addTestimonial', upload.single('image'), addTestimonial);

// Route to get all testimonials
testimonialRoutes.get('/getAllTestimonial', getTestimonials);

// Route to delete a testimonials
testimonialRoutes.delete('/deleteTestimonial',deleteTestimonial);

// Route to edit a testimonials
testimonialRoutes.put('/editTestimonial/:id',upload.single('image'),editTestimonial);

// Route to get single Testimonial details
testimonialRoutes.get('/getTestimonial/:id',getTestimonialById);


export default testimonialRoutes;
