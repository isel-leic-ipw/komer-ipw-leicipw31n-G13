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
    app.get('/recipes/word', handlerWrapper(getRecipesWithWord)) //Get all the recipes with given word
    app.put('/groups', handlerWrapper(createGroup)) //create a group providing a name and a description
    app.put('/groups/edit' , handlerWrapper(editGroup)) //edit a group providing a name and a description
    app.get('/groups', handlerWrapper(getAllGroups))   //Get all groups
    app.delete('/groups',handlerWrapper(deleteGroup)) //delete a group
    app.get('/groups/id',handlerWrapper(getGroupById))  //Gets a group by it's id
    app.post('/groups',handlerWrapper(addRecipeToGroup)) //add a recipe to a group
    app.delete('/groups/delete', handlerWrapper(deleteRecipefromGroup)) //Removes a recipe from a group
    //app.put(/user,handlerWrapper(createNewUser)) //Create a new user

   return app

    function setUserToken(req){
        req.token = req.get("Authorization").split(' ')[1]

    }
    

    function handlerWrapper(handler){
        return async function(req,res){
            setUserToken(req)
            console.log(req.token)
            try {
                res.json(await handler(req,res))
            } catch(e) {
                const error = handleError(e)
                res.status(error.status).json(error.body)
            }
        }
    }


    async function getPopRecipes(req,res){
        res.json( await services.getPopRecipes())
        
    }

    async function getRecipesWithWord(req, res){
        res.json(await services.getRecipesWithWord(req.body.word))
    }

    async function createGroup(req,res){
        res.status(201).json(await services.createGroup(req.body.name,req.body.description))
    }

    async function editGroup(req,res){
        res.json(await services.editGroup(req.body.id, req.body.name, req.body.description))
    }

    async function getAllGroups(req, res){
        res.json(await services.getAllGroups())
    }

    async function deleteGroup(req,res){
        res.json(await services.deleteGroup(req.body.id))
    }

    async function getGroupById(req, res){
        res.json(await services.getGroupById(req.body.id))
    }

    async function addRecipeToGroup(req,res){
        res.json(await services.addRecipeToGroup(req.body.groupId,req.body.recipeId))
    }

    async function deleteRecipefromGroup(req,res){
        res.json(await services.deleteRecipefromGroup(req.body.groupId, req.body.recipeId))
    }

    async function createNewUser(){
        
    }
}