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

const users = [
    {userId: 1,userName : 'User1',authToken:'de469902-4040-47ff-8ea9-5f8ee4efaadc'},
    {userId: 2,userName : 'User2',authToken:'3669e303-5758-4479-b139-94b2475c8554'}
]

let groups = [
    //{id : 1, name : "groupname1", description : "groupdescription1",recipes : [{"id": 2, "title": "Massa com atum ", "summary": " Massa com atum, uma delicia!"}]},
    //{id : 2 , name: "groupname2", description : "groupdescription2", recipes : []}
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

    async function createGroup(name,description){
        const newId = nextId++
        const newGroup = {id : newId, name : name , description : description, recipes: []}
        groups.push(newGroup)
        console.log(groups)
        return newGroup

    }

    async function editGroup(id,name,description){ 
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1) throw errors.NOT_FOUND()
        groups[idx].name = name
        groups[idx].description = description
        console.log(groups)
        return groups[idx]
    }

    async function getAllGroups(){
        if(groups.length == 0){
            throw errors.NOT_FOUND("There are no groups")
        }
        return groups
    }

    async function deleteGroup(id){
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1){
            throw errors.NOT_FOUND()
        }
        const deletedGroup = groups
        groups.splice(idx, 1)
        console.log(groups)
        return deletedGroup
    }

    async function getGroupById(id){
        const group = groups.find(g => g.id == id)
        if(group == undefined){
            throw errors.NOT_FOUND()
        }
        return group
    }

    async function addRecipeToGroup(groupId,recipeId){
        const idx = groups.findIndex(g  => g.id == groupId)
        if(idx == -1) throw errors.NOT_FOUND()
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

    async function deleteRecipefromGroup(groupId, recipeId){
        const group = groups.find(g => g.id == groupId)
        if(!group) throw errors.NOT_FOUND()
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

