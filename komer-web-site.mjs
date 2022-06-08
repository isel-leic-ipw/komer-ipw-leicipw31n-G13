// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'

import handleError from './http-errors.mjs'
//TEMOS QUE TIRAR ISTO---------------------------------------------------------------------------------------------------------------
let userToken = "3669e303-5758-4479-b139-94b2475c8554"

export default function (services){
    const app = express.Router()

    //Configure CRUD routes
    app.get('/verification', setUserTokenForm) // Creates a form to receive data to validate a user
    app.post('/setUser', setUserToken) // Gets the user token
    app.get('/home', handlerWrapper(home))//Main menu
    app.get('/recipes', handlerWrapper(getPopRecipes))//Get the most popular recipes
    app.get('/recipes/:word', handlerWrapper(getRecipesWithWord)) //Get all the recipes with given word --------Kinda Done----------
    app.get('/groups/create', handlerWrapper(getCreatGroupForm)) //Creates a form to receive data to create a group
    app.post('/group/create', handlerWrapper(createGroup)) //create a group providing a name and a description
    app.get('/groups/edit/:id', handlerWrapper(editGroupForm)) //Creates a form to receive data to edit a group
    app.post('/group/edit/:id' , handlerWrapper(editGroup)) //edit a group providing a name and a description
    app.get('/groups', handlerWrapper(getAllGroups))   //Get all groups
    app.post('/groups/delete/:id',handlerWrapper(deleteGroup)) //delete a group                         --------Kinda Done----------
    app.get('/groups/:id',handlerWrapper(getGroupById))  //Gets a group by it's id
    app.get('/groups/recipe/:id', handlerWrapper(addRecipeToGroupForm)) //Creates a form to receive data to add a recipe to a group
    app.post('/groups/recipe',handlerWrapper(addRecipeToGroup)) //add a recipe to a group
    app.post('/groups/deleteRec', handlerWrapper(deleteRecipeFromGroup)) //Removes a recipe from a group

    return app
    
    async function setUserTokenForm(req, res){
        res.render('verification')
    }

    async function setUserToken(req, res){
        userToken = req.body.userToken
        req.token = userToken
        res.redirect('/home')
    }

    //Function that tries to execute the services functions if they throw an error then it's resolved and returns an object.
    function handlerWrapper(handler){
        return async function(req,res){
            req.token = userToken
            //console.log(req.token)
            try {
                await handler(req,res)
            } catch(e) {
                const error = handleError(e)
                res.status(error.status).json(error.body)
            }
        }
    }

    async function home(req,res) {
        res.render('home', {title: "Welcome to the food website!"})
    }

    //Functions that receive the request and response object, they execute the services functions.
    async function getPopRecipes(req,res){
       const recipes = await services.getPopRecipes(req.token)
       res.render('getPopRecipes',{r: recipes, title: `Most Popular Recipes`}) 
    }

    async function getRecipesWithWord(req, res){
        const recipes = await services.getRecipesWithWord(req.token,req.params.word)
        res.render('getRecipeWithWord',{r:recipes, title: `Recipes with ${req.params.word}`})
    }

    async function getCreatGroupForm(req, res){
        res.render('createGroupForm', {title: `Data for new group`, createGroup: true})
    }

    async function createGroup(req,res){
        res.status(201) 
        await services.createGroup(req.token,req.body.name,req.body.description)
        res.redirect('/groups')
    }

    async function editGroupForm(req, res){
        const group = await services.getGroupById(req.token, req.params.id)
        res.render('editGroupform', {g: group, updateGroup: true})
    }

    async function editGroup(req,res){
       const group = await services.editGroup(req.token,req.params.id, req.body.name, req.body.description)
       res.redirect(`/groups/${req.params.id}`)
    }

    async function getAllGroups(req, res){
        const groups = await services.getAllGroups(req.token)
        res.render('getGroups', {g: groups, title: 'Your groups'})
    }

    async function deleteGroup(req,res){
        const group = services.deleteGroup(req.token,req.params.id)
        res.redirect('/groups')
    }

    async function getGroupById(req, res){
        const group = await services.getGroupById(req.token,req.params.id)
        res.render('getGroupById', {g: group, title: `Group ${req.params.id}`})
    }

    async function addRecipeToGroupForm(req, res){
        const group = await services.getGroupById(req.token,req.params.id)
        res.render('addRecipeToGroupForm', {g: group, title: "Add a recipe to a group"})
    }

    async function addRecipeToGroup(req,res){
        const recipe = await services.addRecipeToGroup(req.token,req.body.groupId,req.body.recipeId)
        res.redirect(`/groups/${req.body.groupId}`)
    }

    async function deleteRecipeFromGroup(req,res){
        console.log("RecipeId - " + req.body.recipeId + " GroupId - " + req.body.groupId)
        const recipe = await services.deleteRecipeFromGroup(req.token,req.body.groupId, req.body.recipeId)
        res.redirect(`/groups/${req.body.groupId}`)
    }

    async function createUser(req,res){
        const user = services.createUser(req.body.userName)
        res.render('createUser',{u: user, title: `User ${user.userId} created`})
    }
}