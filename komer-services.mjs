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

    async function getPopRecipes(userToken){
        return groupData.getPopRecipes()
    }

    async function getRecipesWithWord(userToken,word){
        if(!word) throw errors.INVALID_ARGUMENT("word")
        return groupData.getRecipesWithWord(word)
    }

    async function createGroup(userToken,name,description){
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        return groupData.createGroup(name, description)   
    }

    async function editGroup(userToken,id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        return groupData.editGroup(id, name, description)
    }

    async function getAllGroups(userToken){
        return groupData.getAllGroups()
    }

    async function deleteGroup(id){
        //if(!id) throw errors.INVALID_ARGUMENT("id")
        return groupData.deleteGroup(id)
    }

    async function getGroupById(userToken,id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        return groupData.getGroupById(id)
    }

    async function addRecipeToGroup(userToken,groupId,recipeId){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        return groupData.addRecipeToGroup(groupId, recipeId)
        }  

    async function deleteRecipefromGroup(userToken,groupId, recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        return groupData.deleteRecipefromGroup(groupId, recipeId)
    }

    async function createNewUser(){

    }   
}