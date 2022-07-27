// File responsibilities
// Implement all groups/recipes/users handling logic

import { errors } from "../error.mjs" 

//Exporting all the services functions to the server

export default function(groupData) {
    if(!groupData)
        throw "Invalid group data object" 
    return {
        getPopRecipes : validateUser(getPopRecipes),
        getRecipesWithWord : validateUser(getRecipesWithWord),
        getRecipe: validateUser(getRecipe),
        createGroup : validateUser(createGroup),
        editGroup : validateUser(editGroup),
        getAllGroups : validateUser(getAllGroups),
        deleteGroup : validateUser(deleteGroup),
        getGroupById : validateUser(getGroupById),
        addRecipeToGroup : validateUser(addRecipeToGroup),
        deleteRecipeFromGroup : validateUser(deleteRecipeFromGroup),
        createUser: validateUser(createUser),
        getUserByToken: validateUser(getUserByToken),
        getUserByName: validateUser(getUserByName)
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
    //Gets the most popular recipes
    async function getPopRecipes(userToken){
        const user = await (userToken)
        if(!user) throw errors.NOT_FOUND("User")
        return groupData.getPopRecipes()
    }
    //Searches for the recipes with the given word in the title
    async function getRecipesWithWord(userToken,word){
        if(!word) throw errors.INVALID_ARGUMENT("word")
        const user = await groupData.getUserByToken(userToken)
        if(!user) throw errors.NOT_FOUND("User")
        return groupData.getRecipesWithWord(word)
    }

    async function getRecipe(userToken, id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const user = await groupData.getUserByToken(userToken)
        if(!user) throw errors.NOT_FOUND("User") 
        return groupData.getRecipe(id)
    }

    //Creates a new group
    async function createGroup(userToken,name,description){
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        const ownerUser = await groupData.getUserByToken(userToken)
        return groupData.createGroup(name, description, ownerUser)   
    }
    //Edits a group's name and description
    async function editGroup(userToken,id, name, description){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        if(!name) throw errors.INVALID_ARGUMENT("name")
        if(!description) throw errors.INVALID_ARGUMENT("description")
        const user = await groupData.getUserByToken(userToken)
        return groupData.editGroup(user.userId,id, name, description)
    }
    //Returns all respective user's groups
    async function getAllGroups(userToken) {
        const user = await groupData.getUserByToken(userToken)
        return groupData.getAllGroups(user.userId)
    }
    //Deletes a respective user's groups receiving it's id
    async function deleteGroup(userToken,id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const user = await groupData.getUserByToken(userToken)
        return groupData.deleteGroup(user.userId,id)
    }
    //Returns a respective user's group receiving it's id
    async function getGroupById(userToken,id){
        if(!id) throw errors.INVALID_ARGUMENT("id")
        const user = await groupData.getUserByToken(userToken)
        return groupData.getGroupById(user.userId,id)
    }
    //Adds a recipe to a respective user's group
    async function addRecipeToGroup(userToken,groupId,recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        const user = await groupData.getUserByToken(userToken)
        return groupData.addRecipeToGroup(user.userId, groupId,recipeId)
        }  
    //Deletes a recipe from a respectives user's group
    async function deleteRecipeFromGroup(userToken,groupId, recipeId){
        if(!groupId) throw errors.INVALID_ARGUMENT("groupId")
        if(!recipeId) throw errors.INVALID_ARGUMENT("recipeId")
        const user = await groupData.getUserByToken(userToken)
        return groupData.deleteRecipeFromGroup(user.userId,groupId, recipeId)
    }
    //Creates a new user
    async function createUser(userName, password){
        if(!userName) throw errors.INVALID_ARGUMENT("userName")
        return groupData.createUser(userName, password)
    }   
    //Returns a user with the respective Token
    async function getUserByToken(userToken){
        if(!userToken) {    
            throw errors.NOT_FOUND("User")
        }    
        return groupData.getUserByToken(userToken)
    }

    async function getUserByName(username, password){
        if(!username) throw errors.INVALID_ARGUMENT("userName")
        if(!password) throw errors.INVALID_ARGUMENT("password")
        return groupData.getUserByName(username, password)
    }
}