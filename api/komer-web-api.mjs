// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'
//import { response } from 'express'
//import req from 'express/lib/request'
import handleError from './http-errors.mjs'

export default function (services){
    const app = express.Router()


    //Configure CRUD routes to manage games
    app.get('/recipes', handlerWrapper(getPopRecipes))//Get the most popular recipes
    app.get('/recipes/:word', handlerWrapper(getRecipesWithWord)) //Get all the recipes with given word
    app.post('/groups', handlerWrapper(createGroup)) //create a group providing a name and a description
    app.post('/groups/edit' , handlerWrapper(editGroup)) //edit a group providing a name and a description
    app.get('/groups', handlerWrapper(getAllGroups))   //Get all groups
    app.delete('/groups',handlerWrapper(deleteGroup)) //delete a group
    app.get('/groups/:id',handlerWrapper(getGroupById))  //Gets a group by it's id
    app.post('/groups',handlerWrapper(addRecipeToGroup)) //add a recipe to a group
    app.delete('/groups/delete', handlerWrapper(deleteRecipeFromGroup)) //Removes a recipe from a group
    app.put('/users',handlerWrapper(createUser)) //Creates a new user

   return app

    function setUserToken(req){
        const token = req.get("Authorization")
        if(token){
            req.token = token.split(' ')[1]
            console.log(req.token)
        }
    }
    
    //Function that tries to execute the services functions if they throw an error then it's resolved and returns an object.
    function handlerWrapper(handler){
        return async function(req,res){
            setUserToken(req)
            console.log(req.token) 
            try {
                await handler(req,res) //tiramos o res.json()
            } catch(e) {
                const error = handleError(e)
                res.status(error.status).json(error.body)
            }
        }
    }

    //Functions that receive the request and response object, they execute the services functions.

    async function getPopRecipes(req,res){
        return await services.getPopRecipes(req.token)
        
    }

    async function getRecipesWithWord(req, res){
        return await services.getRecipesWithWord(req.token,req.params.word)
    }

    async function createGroup(req,res){
        res.status(201).json( await services.createGroup(req.token,req.body.name,req.body.description))
    }

    async function editGroup(req,res){
        return await services.editGroup(req.token,req.body.id, req.body.name, req.body.description)
    }

    async function getAllGroups(req, res){
        return await services.getAllGroups(req.token)
    }

    async function deleteGroup(req,res){
        return await services.deleteGroup(req.token,req.body.id)
    }

    async function getGroupById(req, res){
        return await services.getGroupById(req.token,req.params.id)
    }

    async function addRecipeToGroup(req,res){
        return await services.addRecipeToGroup(req.token,req.body.groupId,req.body.recipeId)
    }

    async function deleteRecipeFromGroup(req,res){
        return await services.deleteRecipeFromGroup(req.token,req.body.groupId, req.body.recipeId)
    }

    async function createUser(req,res){
        return await services.createUser(req.body.userName)
    }
}