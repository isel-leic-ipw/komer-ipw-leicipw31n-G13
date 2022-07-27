//File responsability is to fetch the recipes from the spoonacular api using the user's respective key

import fetch from "node-fetch";

const KEY = "bc3e95af194f4cb9b657bcb7932e0672"
const POP_RECIPES_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}`

async function fetchJSON(url){
    return fetch(url).then(res => res.json())
}
          
const recipeArray = ['results']

const returnRecipes = await fetchJSON(POP_RECIPES_URL).then(processRecipesPromises) 
   
function recipesTreatement(){
    let treatRecipes = []
    for(let i in returnRecipes){
        treatRecipes.push(returnRecipes[i])
    } 
   return treatRecipes    
}

function processRecipesPromises(r) {
    const toRet = filterProperties(recipeArray,r)
    return toRet.results
    
}

function filterProperties(arr,obj){
    let propFiltered = Object.keys(obj).filter(key => arr.includes(key))
                                       .reduce((object, key) => {
                                           object[key] = obj[key];
                                           return object 
                                       },{});
                                       

    return propFiltered                                  

}

async function recipeDetails(id){
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    const arr = ['id', 'title', 'summary', 'extendedIngredients', 'steps', 'spoonacularSourceUrl']
    const rec =  await fetchJSON(url)
    const recipe = filterProperties(arr, rec)
    recipe.summary = recipe.summary.replaceAll('<b>', '')
    recipe.summary = recipe.summary.replaceAll('</b>', '')
    return recipe
}

async function getRecipesWithWord(word){
    const url = `https://api.spoonacular.com/recipes/information?apiKey=${KEY}/findByIngredients?ingredients=${word}`
    const arr = ['title']
    const rec = await fetchJSON(url)
    const recipes = filterProperties(arr, rec)
    return recipes
}

export {
    recipesTreatement,
    recipeDetails,
    getRecipesWithWord
}