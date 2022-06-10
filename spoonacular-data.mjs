//File responsability is to fetch the recipes from the spoonacular api using the user's respective key

import fetch from "node-fetch";

<<<<<<< HEAD
const KEY = "2080371aedf049c8b72cd887b2ec9b54"
const POP_RECIPES_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}`
=======
const KEY = "bc3e95af194f4cb9b657bcb7932e0672"
const POP_RECIPES_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}`
const RECIPE_ID = 716426
const RECIPE_DETAILS_URL = `https://api.spoonacular.com/recipes/${RECIPE_ID}/information?apiKey=${KEY}`
>>>>>>> b8412259634bfe1704fff34eb28ca9b8693b1ca1

async function fetchJSON(url){
    return fetch(url).then(res => res.json())
}
          
const recipeArray = ['results']

<<<<<<< HEAD
const returnRecipes = await fetchJSON(POP_RECIPES_URL).then(processRecipesPromises) 
   
const recipes = recipesTreatement()
//console.log(recipes)
=======
//const returnRecipes = await fetchJSON(POP_RECIPES_URL).then(processRecipesPromises)
const returnRecipes = await fetchJSON(RECIPE_DETAILS_URL).then(processRecipesPromises)

console.log(returnRecipes)

   
const recipes = recipesTreteament()
>>>>>>> b8412259634bfe1704fff34eb28ca9b8693b1ca1

function recipesTreatement(){
    let treatRecipes = []
    for(let i in returnRecipes){
        treatRecipes.push(returnRecipes[i])
    } 
   return treatRecipes    
}

function processRecipesPromises(r) {
    const toRet = filterProperties(recipeArray,r)
<<<<<<< HEAD
    return toRet.results
=======
    return toRet.results //tirei o map desta linha!!!
>>>>>>> b8412259634bfe1704fff34eb28ca9b8693b1ca1
    
}

function filterProperties(arr,obj){
    let propFiltered = Object.keys(obj).filter(key => arr.includes(key))
                                       .reduce((object, key) => {
                                           object[key] = obj[key];
                                           return object 
                                       },{});
<<<<<<< HEAD
                                       

    return propFiltered                                  

}
=======
                                       console.log(propFiltered)

    return propFiltered                                  
>>>>>>> b8412259634bfe1704fff34eb28ca9b8693b1ca1

async function recipeDetails(id){
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    const arr = ['id', 'title', 'summary', 'extendedIngredients', 'steps', 'spoonacularSourceUrl']
    const rec =  await fetchJSON(url)
    const recipe = filterProperties(arr, rec)
    recipe.summary = recipe.summary.replaceAll('<b>', '')
    recipe.summary = recipe.summary.replaceAll('</b>', '')
    console.log("Recipe Details ->" + recipe + " Recipe DetailsEnd")
    return recipe
}

export {
    recipes,
    recipeDetails
}