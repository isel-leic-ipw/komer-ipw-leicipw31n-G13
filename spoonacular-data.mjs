import fetch from "node-fetch";

const spoonacularKey = 'bc3e95af194f4cb9b657bcb7932e0672'
const spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&sort=popularity`


 

async function fetchJSON(url) {
    return fetch(url)
        .then(rsp => rsp.json())
}
          
const arr = ['results']

const recipes = await fetchJSON(spoonacularURL).then(processRecipesPromises)
   

function processRecipesPromises(r) {
    const toRet = filterProperties(arr,r)
    return JSON.stringify(toRet,null,'\n')
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