import {Router} from 'express'
import upload from '../config.js/multerConfig.js';
import { addAdminDetails, getAdminDetails, updateAdminDetails } from '../controllers/adminDetails.controller.js';

const adminDetailsRoutes = Router();

adminDetailsRoutes.post('/addAdminDetails',upload.single('adminLogo'),addAdminDetails);
adminDetailsRoutes.put('/updateAdminDetails',upload.single('adminLogo'),updateAdminDetails);
adminDetailsRoutes.get('/getAdminDetails',getAdminDetails)


export default adminDetailsRoutes