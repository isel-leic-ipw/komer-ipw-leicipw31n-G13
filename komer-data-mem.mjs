// File responsibilities
// Implement data access to memory storage
import fetch from "node-fetch";
import { errors } from "./error.mjs"

const recipes = [
    {id: 1, title: "Batatas com atum ", summary: " Batatas com atum, uma delicia!"},
    {id: 2, title: "Massa com atum ", summary: " Massa com atum, uma delicia!"},
    {id: 3, title: "Alface com atum ", summary: " Alface com atum, uma delicia!"},
    {id: 4, title: "Sandes com atum ", summary: " Sande com atum, uma delicia!"},
    {id: 5, title: "Maionese com frango", summary: " Maionese com frango, uma delicia!"}
]


let groups = [
    {id : 1, name : "groupname1", description : "groupdescription1",recipes : [{"id": 2, "title": "Massa com atum ", "summary": " Massa com atum, uma delicia!"}],ownerUser:100},
    {id : 2 , name: "groupname2", description : "groupdescription2", recipes : [],ownerUser:100},
    {id : 3 , name: "groupname3", description : "groupdescription3", recipes : [],ownerUser:101},
    {id : 4 , name: "groupname4", description : "groupdescription4", recipes : [],ownerUser:101},
]

let nextId = groups.length + 1

export default function(){
    return{
        getPopRecipes : getPopRecipes,
        getRecipesWithWord : getRecipesWithWord,
        createGroup : createGroup,
        editGroup : editGroup,
        getAllGroups : getAllGroups,
        deleteGroup : deleteGroup,
        addRecipeToGroup : addRecipeToGroup,
        getGroupById : getGroupById,
        deleteRecipefromGroup : deleteRecipefromGroup
    }
       
    async function getPopRecipes(){
        return recipes
    }

    async function getRecipesWithWord(word){
        const auxArr = recipes.filter(recipe => recipe.title.includes(word))
        if(auxArr.length == 0) throw errors.NOT_FOUND()
        return auxArr
    }

    async function createGroup(name,description,ownerUser){ //alterei este aqui
        const newId = nextId++
        const newGroup = {id : newId, name : name , description : description, recipes: [],ownerUser:ownerUser.userId}
        groups.push(newGroup)
        console.log(groups)
        return newGroup

    }

    async function editGroup(userId,id,name,description){ 
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1) throw errors.NOT_FOUND()
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        groups[idx].name = name
        groups[idx].description = description
        console.log(groups)
        return groups[idx]
    }

    async function getAllGroups(userId){
        if(groups.length == 0){
            throw errors.NOT_FOUND("There are no groups")
        }
        return groups.filter(g => g.ownerUser == userId)
    }

    async function deleteGroup(userId,id){
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1){
            throw errors.NOT_FOUND()
        }
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        const deletedGroup = groups
        groups.splice(idx, 1)
        console.log(groups)
        return deletedGroup
    }

    async function getGroupById(userId,id){
        const group = groups.find(g => g.id == id)
        if(group == undefined){
            throw errors.NOT_FOUND()
        }
        if(group.ownerUser != userId){
            throw errors.INVALID_USER()
        }
        return group
    }

    async function addRecipeToGroup(userId,groupId,recipeId){
        const idx = groups.findIndex(g  => g.id == groupId)
        if(idx == -1) throw errors.NOT_FOUND()
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        const recipe = recipes.find(r => r.id == recipeId)
        if(recipe == undefined) throw errors.NOT_FOUND()
        if(groups[idx].recipes.find(r => r.id == recipeId) == undefined){
            groups[idx].recipes.push(recipe)
        }
        else {
            throw errors.REPEATED_VALUE(recipeId)
        }
        return groups[idx]
    }

    async function deleteRecipefromGroup(userId,groupId, recipeId){
        const group = groups.find(g => g.id == groupId)
        if(!group) throw errors.NOT_FOUND()
        if(group.ownerUser != userId){
            throw errors.INVALID_USER()
        }
        if(group == undefined) throw errors.NOT_FOUND()
        const idx = group.recipes.findIndex(r => r.id == recipeId)
        if(idx == -1) throw errors.NOT_FOUND()
        group.recipes.splice(idx, 1)
        console.log(groups)
        return group
    }

    async function createNewUser(){
        
    }
}

