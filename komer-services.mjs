//import dataMem from './komer-data-mem.mjs'

import { errors } from "./error.mjs"

export default function(groupData) {
    if(!groupData)
        throw "Invalid group data object"
    return {
        getPopRecipes : getPopRecipes,
        getRecipesWithWord : getRecipesWithWord,
        createGroup : createGroup,
        editGroup : editGroup,
        getAllGroups : getAllGroups,
        deleteGroup : deleteGroup,
        getGroupById : getGroupById,
        addRecipeToGroup : addRecipeToGroup,
        deleteRecipefromGroup : deleteRecipefromGroup
    }     

    async function getPopRecipes(){
        return groupData.getPopRecipes()
    }

    async function getRecipesWithWord(word){
        if(!word) throw errors.INVALID_ARGUMENT("word")
        return groupData.getRecipesWithWord(word)
    }

    async function createGroup(name,description){
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        return groupData.createGroup(name, description)   
    }

    async function editGroup(id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        return groupData.editGroup(id, name, description)
    }

    async function getAllGroups(){
        return groupData.getAllGroups()
    }

    async function deleteGroup(id){
        //if(!id) throw errors.INVALID_ARGUMENT("id")
        return groupData.deleteGroup(id)
    }

    async function getGroupById(id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        return groupData.getGroupById(id)
    }

    async function addRecipeToGroup(id,recipe){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!recipe) throw errors.INVALID_ARGUMENT("recipe")
            const recipes = {id : recipe.id,title : recipe.title,summary : recipe.summary}
            return groupData.addRecipeToGroup(id, recipes)
        }  

    async function deleteRecipefromGroup(groupId, recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        return groupData.deleteRecipefromGroup(groupId, recipeId)
    }

    async function createNewUser(){

    }   
}