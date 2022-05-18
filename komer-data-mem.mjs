// File responsibilities
// Implement data access to memory storage
import fetch from "node-fetch";
import { errors } from "./error.mjs"

let spoonacularKey = 'bc3e95af194f4cb9b657bcb7932e0672'
let spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularKey}&sort=popularity`

async function fetchJSON(url){
    const rsp = await fetch(url)
    return rsp.json()
}



/*const recipes = [
        {id: 1, title: "Batatas com atum ", summary: " Batatas com atum, uma delicia!"},
        {id: 2, title: "Massa com atum ", summary: " Massa com atum, uma delicia!"},
        {id: 3, title: "Alface com atum ", summary: " Alface com atum, uma delicia!"},
        {id: 4, title: "Sandes com atum ", summary: " Sande com atum, uma delicia!"},
        {id: 5, title: "Maionese com frango", summary: " Maionese com frango, uma delicia!"}
]*/

let groups = [
    {id : 1, name : "groupname1", description : "groupdescription1",recipes : []},
    {id : 2 , name: "groupname2", description : "groupdescription2", recipes : []}
]

let nextId = groups.length

export default function(){
    return{
        getAll : getAll,
        createGroup : createGroup,
        editGroup : editGroup,
        getAllGroups : getAllGroups,
        deleteGroup : deleteGroup,
        addRecipeToGroup : addRecipeToGroup,
        getGroupById : getGroupById,
        deleteRecipefromGroup : deleteRecipefromGroup
    }
       
    async function createGroup(newGroupObj){
        const newId = nextId++
        const newGroup = {id : newId, name : newGroupObj.name , description : newGroupObj.description, recipes: []}
        groups.push(newGroup)
        console.log(groups)
        return newGroup

    }

    async function getAll(){ //na verdade isto tá a fazer um getallrecipes é só pra não andar a mudar nomes e só pra testar a ver se isto funfa xd
        return recipes
    }

    async function editGroup(id,name,description){ 
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1) throw errors.NOT_FOUND()
        groups[idx].name = name
        groups[idx].description = description
        console.log(groups)
        return groups[idx]
    }

    async function getAllGroups(){
        return groups
    }

    async function deleteGroup(id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1){
            throw `Group with id ${id} not found`
        }
        const deletedGroup = groups[idx]
        groups.splice(idx, 1)
        console.log(groups)
        return deletedGroup
    }

    async function getGroupById(id){
        const group = groups.find(g => g.id = id)
        if(!group) throw errors.NOT_FOUND() 
        if(group == undefined){
            throw `Group with id ${id} not found`
        }
        return group
    }

    async function addRecipeToGroup(id,recipe){
        const idx = groups.findIndex(g  => g.id == id)
        if(groups[idx] == undefined) throw errors.NOT_FOUND()
        if(groups[idx].recipes.find(r => r.id == recipe.id) == undefined){
        groups[idx].recipes.push(recipe)
        }
        else {
            console.log("Recipe already exists")
        }
        return groups[idx]
    }

    async function deleteRecipefromGroup(groupId, recipeId){
        const group = groups.find(g => g.id == groupId)
        if(!group) throw errors.NOT_FOUND()
        if(group == undefined) throw `Group with id ${idx} not found`
        const idx = group.recipes.findIndex(r => r.id == recipeId)
        if(idx == -1) throw `This group doens't have the recipe`
        group.recipes.splice(idx, 1)
        console.log(groups)
        return group
    }
}

