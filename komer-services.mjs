/*
    modulo services é fundamental, é onde é implementada a logica da API 
    manda gravar , mandar obter, manda aceder aos dados 

    implement data access to memory storage 

*/


//import apidata  // ficheiro q é preciso fazer 



export default {
    FavRecipes,
    getRecipe,
    createGroup,
}

const favRecipes = [
        {id: 1, title: "Batatas com atum ", summary: " Batatas com atum, uma delicia!"},
        {id: 2, title: "Massa com atum ", summary: " Massa com atum, uma delicia!"},
        {id: 3, title: "Alface com atum ", summary: " Alface com atum, uma delicia!"},
        {id: 4, title: "Sandes com atum ", summary: " Sande com atum, uma delicia!"},
        {id: 5, title: "Maionese com frango", summary: " Maionese com frango, uma delicia!"}
        
]

const nextGroupId = 0

async function FavRecipes(){
    return Promise.resolve(favRecipes)

}

async function getRecipe(name){
    if(!name) return Promise.reject("Invalid Name")
    const recipe = favRecipes.filter(r => r.name.includes(name)) 
    if(!recipe) return Promise.reject("Not Found")
    return Promise.resolve(recipe)
}


async function createGroup(name, description){
    if(!name) return Promise.reject("Invalid name for group")
    const groupID = nextGroupId++
    const newGroup = {name : name, description : description, recipes : []}
    return Promise.resolve(newGroup)
}

