import { Router } from 'express'
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.get('/getAllCategory',getAllCategory);
categoryRouter.get('/getCategoryById/:id',getCategoryById)
categoryRouter.post('/addCategory',addCategory);
categoryRouter.put('/editCategory/:id', editCategory);
categoryRouter.delete('/deleteCategory/:id',deleteCategory)

export default categoryRouter