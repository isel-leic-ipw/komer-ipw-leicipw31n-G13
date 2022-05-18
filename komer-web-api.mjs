// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'
import { response } from 'express'
import handleError from './http-errors.mjs'

export default function (services){
    const app = express.Router()


    //Configure CRUD routes to manage games
    app.get('/get/recipes', handlerWrapper(getAll ))//Get the most popular recipes
    app.post('/create/group', handlerWrapper(createGroup)) //create a group providing a name and a description
    app.put('/edit/group' , handlerWrapper(editGroup)) //edit a group providing a name and a description
    app.get('/get/groups', handlerWrapper(getAllGroups))   //Get all groups
    app.delete('/delete/group',handlerWrapper(deleteGroup)) //delete a group
    app.get('/get/group',handlerWrapper(getGroupById))  //Gets a group by it's id
    app.put('/update/group',handlerWrapper(addRecipeToGroup)) //add a recipe to a group
    app.delete('/delete/recipe', handlerWrapper(deleteRecipefromGroup)) //Removes a recipe from a group

    return app

    function handlerWrapper(handler){

        return async function(req,res){
            try{
                res.json(await handler(req,res))
            } catch(e){
                const error = handleError(e)
                res.status(error.status).json(error.body)
            }
        }
    }

    async function getAll(req,res){
        return res.json(await services.getAll())
    }

    async function createGroup(req,res){
        return res.json(await services.createGroup(req.body.name,req.body.description))
    }

    async function editGroup(req,res){
        return res.json(await services.editGroup(req.body.id, req.body.name, req.body.description))
    }

    async function getAllGroups(req, res){
        return res.json(await services.getAllGroups())
    }

    async function deleteGroup(req,res){
        return res.json(await services.deleteGroup(req.body.id))
    }

    async function getGroupById(req, res){
        return res.json(await services.getGroupById(req.body.id))
    }

    async function addRecipeToGroup(req,res){
        return res.json(await services.addRecipeToGroup(req.body.id,req.body.recipe))
    }

    async function deleteRecipefromGroup(req,res){
        return res.json(await services.deleteRecipefromGroup(req.body.groupId, req.body.recipeId))
    }
}