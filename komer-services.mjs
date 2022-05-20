//import dataMem from './komer-data-mem.mjs'

import { errors } from "./error.mjs"

//import getUserByToken from "./users-data_mem.mjs"

export default function(groupData,usersData) {
    if(!groupData)
        throw "Invalid group data object" //O falcao disse que aqui é para lançar um objecto aplicacional e pra nós fazermos
    if(!usersData)
        throw "Invalid users data object" //O falcao disse que aqui é para lançar um objecto aplicacional e pra nós fazermos
    return {
        getPopRecipes : validateUser(getPopRecipes),
        getRecipesWithWord : validateUser(getRecipesWithWord),
        createGroup : validateUser(createGroup),
        editGroup : validateUser(editGroup),
        getAllGroups : validateUser(getAllGroups),
        deleteGroup : validateUser(deleteGroup),
        getGroupById : validateUser(getGroupById),
        addRecipeToGroup : validateUser(addRecipeToGroup),
        deleteRecipefromGroup : validateUser(deleteRecipefromGroup)
    }     

    function validateUser(f){
        return async function(...args){
            const token = args[0]
            //Validate if it is a valid string for a token
           // if(!token || token.constructor !== String){
                //return Promise.reject(errors.INVALID_TOKEN())
                //TODO: Validate if the string corresponds to a UUID
            //}
            return f.apply(null, args)
        }
    }
            
    async function getPopRecipes(userToken){
        const user = await usersData.getUserByToken(userToken)
        if(!user) throw errors.INVALID_USER
        return groupData.getPopRecipes(user.userId)
    }

    async function getRecipesWithWord(userToken,word){
        if(!word) throw errors.INVALID_ARGUMENT("word")
        const user = await usersData.getUserByToken(userToken)
        if(!user) throw errors.INVALID_USER
        return groupData.getRecipesWithWord(word)
    }

    async function createGroup(userToken,name,description){
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        const ownerUser = await usersData.getUserByToken(userToken)
        return groupData.createGroup(name,description, ownerUser)   
    }

    async function editGroup(userToken,id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        const user = await usersData.getUserByToken(userToken)
        return groupData.editGroup(user.userId,id, name, description)
    }

    async function getAllGroups(userToken){
        const user = await usersData.getUserByToken(userToken)
        return groupData.getAllGroups(user.userId)
    }

    async function deleteGroup(userToken,id){
        //if(!id) throw errors.INVALID_ARGUMENT("id")
        const user = await usersData.getUserByToken(userToken)
        return groupData.deleteGroup(user.userId,id)
    }

    async function getGroupById(userToken,id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const user = await usersData.getUserByToken(userToken)
        return groupData.getGroupById(user.userId,id)
    }

    async function addRecipeToGroup(userToken,groupId,recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        const user = await usersData.getUserByToken(userToken)
        return groupData.addRecipeToGroup(user.userId, groupId,recipeId)
        }  

    async function deleteRecipefromGroup(userToken,groupId, recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        const user = await usersData.getUserByToken(userToken)
        return groupData.deleteRecipefromGroup(user.userId,groupId, recipeId)
    }

    async function createNewUser(){

    }   
}
