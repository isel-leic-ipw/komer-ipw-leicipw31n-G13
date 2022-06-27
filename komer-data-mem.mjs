// File responsibilities
// Implement data access to memory storage
import { errors } from "../error.mjs"
import crypto from 'crypto'
import {recipesTreatement, recipeDetails} from '../spoonacular-data.mjs'


const USERS = [
    {userId: 100,userName : 'User1',authToken:'de469902-4040-47ff-8ea9-5f8ee4efaadc'},
    {userId: 101,userName : 'User2',authToken:'3669e303-5758-4479-b139-94b2475c8554'},
    {userId: 102,userName : 'User3',authToken:'286fc6f9-fdd6-4274-a783-5e1d3c36885e'}
]

let nextIdUser = USERS.length + 100

let groups = [
    {id : 1, name : "groupname1", description : "groupdescription1",recipes : [{id: 715424,title: "The Best Chili",image: "https://spoonacular.com/recipeImages/715424-312x231.jpg",imageType: "jpg"
},],ownerUser:100},
    {id : 2 , name: "groupname2", description : "groupdescription2", recipes : [{id: 715424,title: "The Best Chili",image: "https://spoonacular.com/recipeImages/715424-312x231.jpg",imageType: "jpg"
}],ownerUser:100},
    {id : 3 , name: "groupname3", description : "groupdescription3", recipes : [{id: 715424,title: "The Best Chili",image: "https://spoonacular.com/recipeImages/715424-312x231.jpg",imageType: "jpg"
}],ownerUser:101},
    {id : 4 , name: "groupname4", description : "groupdescription4", recipes : [{id: 715424,title: "The Best Chili",image: "https://spoonacular.com/recipeImages/715424-312x231.jpg",imageType: "jpg"
    },],ownerUser:101},
]

let nextId = groups.length + 1


export default function(){
    return{
        getUserByToken : getUserByToken,
        getPopRecipes : getPopRecipes,
        getRecipesWithWord : getRecipesWithWord,
        getRecipe: getRecipe,
        createGroup : createGroup,
        editGroup : editGroup,
        getAllGroups : getAllGroups,
        deleteGroup : deleteGroup,
        addRecipeToGroup : addRecipeToGroup,
        getGroupById : getGroupById,
        deleteRecipeFromGroup : deleteRecipeFromGroup,
        createUser: createUser
    }

    async function getUserByToken(token){
        const user = USERS.find(u => u.authToken == token)
        if(!user){
            throw errors.NOT_FOUND("User")
        }
        return user
    }
       
    async function getPopRecipes(){
        return recipesTreatement()
    }

    async function getRecipesWithWord(word){
        const auxArr = recipesTreatement().filter(recipe => recipe.title.toLowerCase().includes(word.toLowerCase()))
        if(auxArr.length == 0) throw errors.NOT_FOUND(`Recipe with ${word}`)
        return auxArr
    }

    async function getRecipe(id){
        const recipe = await recipeDetails(id)
        return recipe
    }

    async function createGroup(name,description,ownerUser){
        const newId = nextId++
        const newGroup = {id : newId, name : name , description : description, recipes: [],ownerUser:ownerUser.userId}
        groups.push(newGroup)
        return newGroup

    }

    async function editGroup(userId,id,name,description){ 
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1) throw errors.NOT_FOUND("Group")
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        groups[idx].name = name
        groups[idx].description = description
        return groups[idx]
    }

    async function getAllGroups(userId){
        const filteredGroups = groups.filter(g => g.ownerUser == userId)
        if(filteredGroups.length == 0){
            throw errors.NOT_FOUND("Groups")
        }
        return filteredGroups
    }

    async function deleteGroup(userId,id){
        const idx = groups.findIndex(g => g.id == id)
        if(idx == -1){
            throw errors.NOT_FOUND("Group")
        }
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        const deletedGroup = groups.splice(idx, 1)
        return deletedGroup
    }

    async function getGroupById(userId,id){
        const group = groups.find(g => g.id == id)
        if(group == undefined){
            throw errors.NOT_FOUND("Group")
        }
        if(group.ownerUser != userId){
            throw errors.INVALID_USER()
        }
        return group
    }

    async function addRecipeToGroup(userId,groupId,recipeId){
        const idx = groups.findIndex(g  => g.id == groupId)
        if(idx == -1) throw errors.NOT_FOUND("Group")
        if(groups[idx].ownerUser != userId){
            throw errors.INVALID_USER()
        }
        const recipe = recipesTreatement().find(r => r.id == recipeId)
        if(recipe == undefined) throw errors.NOT_FOUND("Recipe")
        if(groups[idx].recipes.find(r => r.id == recipeId) == undefined){
            groups[idx].recipes.push(recipe)
        }
        else {
            throw errors.REPEATED_VALUE(recipeId)
        }
        return groups[idx]
    }

    async function deleteRecipeFromGroup(userId,groupId, recipeId){
        const group = groups.find(g => g.id == groupId)
        if(group == undefined) throw errors.NOT_FOUND("Group")
        if(group.ownerUser != userId){
            throw errors.INVALID_USER()
        }
        const idx = group.recipes.findIndex(r => r.id == recipeId)
        if(idx == -1) throw errors.NOT_FOUND("Recipe")
        group.recipes.splice(idx, 1)
        return group
    }

    async function createUser(userName){
        let userToken = crypto.randomUUID()
        while(USERS.find(u => u.authToken == userToken)!= undefined){
            userToken = crypto.randomUUID()
        }
        const user = {userId: nextIdUser ,userName : userName ,authToken: userToken}
        USERS.push(user)
        return user
    }
}

