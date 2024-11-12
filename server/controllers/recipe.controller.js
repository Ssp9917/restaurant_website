import Recipe from '../models/recipe.model.js';
import Category from '../models/category.model.js';


// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('category', 'name'); // Populate category name
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in getAllRecipes controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new recipe
export const addRecipe = async (req, res) => {
  try {
    const { name, category, price, oldPrice, discount, description, rating, bestSeller,topSellingProduct,featuredProduct } = req.body;
    const image = req.file.path; // Get the uploaded image path

    // console.log(category, name, image, price, oldPrice, discount, description, rating, bestSeller);

    // Check if category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Create new recipe
    const newRecipe = new Recipe({
      name,
      image,
      category,
      price,
      oldPrice,
      discount,
      description,
      rating,
      bestSeller,
      topSellingProduct,
      featuredProduct
    });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully", newRecipe });
  } catch (error) {
    console.error("Error in addRecipe controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single recipe details by ID
export const getSingleRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find recipe by ID and populate category name
    const recipe = await Recipe.findById(id).populate('category', 'name');
    
    // Check if recipe exists
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error in getSingleRecipeDetails controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit a recipe by ID
export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, oldPrice, discount, description, rating, bestSeller,topSellingProduct,featuredProduct } = req.body;
    const image = req.file ? req.file.path : null; // If an image is uploaded, get the path; otherwise, it stays null

    // Check if the recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the category exists (if provided)
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    // Update the recipe
    recipe.name = name || recipe.name;
    recipe.category = category || recipe.category;
    recipe.price = price || recipe.price;
    recipe.oldPrice = oldPrice || recipe.oldPrice;
    recipe.discount = discount || recipe.discount;
    recipe.description = description || recipe.description;
    recipe.rating = rating || recipe.rating;
    recipe.bestSeller = bestSeller || recipe.bestSeller;
    recipe.featuredProduct = featuredProduct || recipe.featuredProduct;
    recipe.topSellingProduct = topSellingProduct || recipe.topSellingProduct;

    
    if (image) recipe.image = image; // Update image if a new one is uploaded

    // Save the updated recipe
    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    console.error("Error in editRecipe controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findByIdAndDelete(id); // Delete the category

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error("Error in deleteRecipe controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

