// File rsponsibilities
// Have the functions that handle HTTP requests

import express from 'express'
import services from './komer-services.mjs'

const app = express.Router()
export default app

app.get('/api/poprecipes', getFavRecipes)           // Get all recipes
app.get('/api/recipes/:name', getRecipe)        // Get a specific recipe details
/* app.delete('/api/recipes/:id', deleteRecipe)  // Delete a recipe
app.put('/api/recipes/:id', updateRecipe)     // Update a recipe */
app.post('/api/group', createGroup)        // Create Group

async function getFavRecipes(req, res){
    services.FavRecipes()
        .then(favRecipes => res.json(favRecipes))
}   

async function getRecipe(req, res){
    res.json(await services.getRecipe(req.params.name))
}

async function createGroup(req, res){
    console.log("Body" + req.body)
}