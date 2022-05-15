



const SPOONACULAR_API_KEY = "37ce4e18ca594bb89964cf8e338d0a2e"
const RECEIPES_COUNT = 5
const RANDOM_RECIPES_URL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${RECEIPES_COUNT}`

async function fetchJson(url){
    const rsp = await fetch(url);
    const recipes = await rsp.json();
    return recipes
 }
 
 const r = await fetchJson(RANDOM_RECIPES_URL)