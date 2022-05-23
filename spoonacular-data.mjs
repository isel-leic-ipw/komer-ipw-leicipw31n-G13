//File responsability is to fetch the recipes from the spoonacular api using the user's respective key

import fetch from "node-fetch";

const KEY = "bc3e95af194f4cb9b657bcb7932e0672"
const RANDOM_RECIPES_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}`

async function fetchJSON(url){
    const rsp = await fetch(url)
    return rsp.json()
}
          
const recipeArray = ['results']

const returnRecipes = await fetchJSON(RANDOM_RECIPES_URL).then(processRecipesPromises)

function recipesTreteament(){
    let treatRecipes = []
    for(let i in returnRecipes){
        treatRecipes.push(returnRecipes[i])
    } 
   return treatRecipes    
}
   
const recipes = recipesTreteament()

function processRecipesPromises(r) {
    const toRet = filterProperties(recipeArray,r)
    return toRet.results.map(r => r)
}


function filterProperties(arr,obj){
    let propFiltered = Object.keys(obj).filter(key => arr.includes(key))
                                       .reduce((object, key) => {
                                           object[key] = obj[key];
                                           return object 
                                       },{});

     return propFiltered                                  

}

export default recipes