import express from 'express';
import { getAllRecipes, addRecipe, getSingleRecipeDetails, editRecipe, deleteRecipe } from '../controllers/recipe.controller.js';
import upload from '../config.js/multerConfig.js';

const recipeRouter = express.Router();

// Route to get all recipes
recipeRouter.get('/getAllrecipes', getAllRecipes);
recipeRouter.post('/addRecipes', upload.single('image'),addRecipe);
recipeRouter.get('/getSingleRecipe/:id', getSingleRecipeDetails);
recipeRouter.put('/editRecipe/:id',editRecipe);
recipeRouter.delete('/deleteRecipe/:id',deleteRecipe)

export default recipeRouter;
