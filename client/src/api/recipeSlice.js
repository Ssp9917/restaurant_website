import apiSlice from './apiSlice';

export const recipeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all menu items
        getAllRecipe: builder.query({
            query: () => 'recipe/getAllRecipes'
        }),

        // Add a new menu item
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: 'recipe/addRecipes',
                method: 'POST',
                body: recipe,
            }),
        }),

         // Get single recipe details by ID
         getSingleRecipeDetails: builder.query({
            query: (id) => `recipe/getSingleRecipe/${id}`, // Adjust path as needed
        }),


         // Edit a recipe by ID
         editRecipe: builder.mutation({
            query: ({ id, recipe }) => ({
                url: `recipe/editRecipe/${id}`,
                method: 'PUT',
                body: recipe,
            }),
        }),



        // Delete a recipe by ID
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: `recipe/deleteRecipe/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

// Export hooks for the API endpoints
export const {
    useGetAllRecipeQuery,
    useAddRecipeMutation,
    useGetSingleRecipeDetailsQuery,
    useDeleteRecipeMutation,
    useEditRecipeMutation,
} = recipeSlice;
