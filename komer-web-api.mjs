// File rsponsibilities
// Have the functions that handle HTTP requests

import express from 'express'
import services from './komer-services.mjs'

const app = express.Router()
export default recipesApi

app.get('/api/recipes', getRecipes)           // Get all recipes
app.get('/api/recipes/:id', getRecipe)        // Get a specific recipe details
app.delete('/api/recipes/:id', deleteRecipe)  // Delete a recipe
app.put('/api/recipes/:id', updateRecipe)     // Update a recipe
app.post('/api/recipes', createRecipe)        // Delete a recipe

app.get()

