//File responsability is to fetch the recipes from the spoonacular api using the user's respective key

import fetch from "node-fetch";

const KEY = "bc3e95af194f4cb9b657bcb7932e0672"
const POP_RECIPES_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}`
const RECIPE_ID = 716426
const RECIPE_DETAILS_URL = `https://api.spoonacular.com/recipes/${RECIPE_ID}/information?apiKey=${KEY}`

async function fetchJSON(url){
    const rsp = await fetch(url)
    return rsp.json()
}
          
const recipeArray = ['results']

//const returnRecipes = await fetchJSON(POP_RECIPES_URL).then(processRecipesPromises)
const returnRecipes = await fetchJSON(RECIPE_DETAILS_URL).then(processRecipesPromises)

console.log(returnRecipes)

   
const recipes = recipesTreteament()

function recipesTreteament(){
    let treatRecipes = []
    for(let i in returnRecipes){
        treatRecipes.push(returnRecipes[i])
    } 
   return treatRecipes    
}

function processRecipesPromises(r) {
    const toRet = filterProperties(recipeArray,r)
    return toRet.results //tirei o map desta linha!!!
    
}

function filterProperties(arr,obj){
    let propFiltered = Object.keys(obj).filter(key => arr.includes(key))
                                       .reduce((object, key) => {
                                           object[key] = obj[key];
                                           return object 
                                       },{});
                                       console.log(propFiltered)

    return propFiltered                                  

}

export default recipes