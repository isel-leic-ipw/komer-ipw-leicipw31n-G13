// File responsibilities
// Register game api routes
// Have the functions that handle HTTP requests

import express from 'express'

import handleError from './http-errors.mjs'

let userToken = undefined

export default function (services){
    const app = express.Router()

    //Configure CRUD routes
    app.get('/login', setUserTokenForm)                                                 //Creates a form to receive data to validate a user
    app.post('/setUser', setUserToken)                                                  //Sets the user token
    app.post('/user', handlerWrapper(createUser))                                       //Creates a new user
    app.get('/', handlerWrapper(home))                                                  //Main menu
    app.get('/recipes', handlerWrapper(getPopRecipes))                                  //Get the most popular recipes
    app.get('/recipe/:word', handlerWrapper(getRecipe))                                 //Gets the recipe passed as a paremeter
    app.get('/recipes/form', handlerWrapper(getRecipesWithWordForm))                    //Creates a form to receive data to search for a recipe
    app.post('/recipes/redirect', handlerWrapper(redirectRecipeswithWord))              //Redirect's to the page that's received on the form
    app.get('/recipes/:word', handlerWrapper(getRecipesWithWord))                       //Get all the recipes with given word 
    app.get('/groups/create', handlerWrapper(getCreatGroupForm))                        //Creates a form to receive data to create a group
    app.post('/group/create', handlerWrapper(createGroup))                              //Create a group providing a name and a description
    app.get('/groups/edit/:id', handlerWrapper(editGroupForm))                          //Creates a form to receive data to edit a group
    app.post('/group/edit/:id' , handlerWrapper(editGroup))                             //Edit a group providing a name and a description
    app.get('/groups', handlerWrapper(getAllGroups))                                    //Get all groups
    app.post('/groups/delete/:id',handlerWrapper(deleteGroup))                          //Delete a group                         
    app.get('/groups/:id',handlerWrapper(getGroupById))                                 //Gets a group by it's id
    app.get('/groups/recipe/:word', handlerWrapper(addRecipeToGroupForm))               //Creates a form to receive data to add a recipe to a group
    app.post('/groups/recipes/:groupId',handlerWrapper(addRecipeToGroup))               //Add a recipe to a group
    app.post('/groups/deleteRec/:groupId', handlerWrapper(deleteRecipeFromGroup))       //Removes a recipe from a group
    
    return app
    
    async function setUserTokenForm(req, res){
        userToken = undefined
        res.render('login')
    }

    async function setUserToken(req, res){
        const user = await services.getUserByName(req.body.username, req.body.password)
        userToken = user.authToken
        req.token = userToken
        res.redirect('/')
    }

    async function createUser(req, res){
        const user = await services.createUser(req.body.username, req.body.password)
        userToken = user.authToken
        req.token = userToken
        res.render(`user`, {u: user, title: `User ${user.token}`})
    }

    //Function that tries to execute the services functions if they throw an error then it's resolved and returns an object.
    function handlerWrapper(handler){
        return async function(req,res){
            req.token = userToken
            try {
                await handler(req,res)
            } catch(e) {
                const error = handleError(e)
                res.render('error', {e: error.body.error, title: `Error ${error.status}`})
                //TODO: res.status(error.status).json(error.body) -> Não sei oq fazer com isto
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

    async function getRecipe(req, res){
        const aux = await services.getRecipesWithWord(req.token, req.params.word)
        const recipe = await services.getRecipe(req.token, aux[0].id)
        res.render('getRecipe', {r:recipe, title: `${req.params.word}`})
    }

    async function getRecipesWithWordForm(req, res){
        await services.getUserByToken(req.token)
        res.render('getRecipeWithWordForm', {title: 'Search Recipes'})
    }

    async function redirectRecipeswithWord(req, res){
        res.redirect(`/recipes/${req.body.word}`)
    }

    async function getRecipesWithWord(req, res){
        const recipes = await services.getRecipesWithWord(req.token,req.params.word)
        const groups = await services.getAllGroups(req.token)
        res.render('getRecipeWithWord',{r:recipes, g: groups, title: `Recipes with ${req.params.word}`})
    }

    async function getCreatGroupForm(req, res){
        await services.getUserByToken(req.token)
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
        services.deleteGroup(req.token,req.params.id)
        res.redirect('/groups')
    }

    async function getGroupById(req, res){
        const group = await services.getGroupById(req.token,req.params.id)
        res.render('getGroupById', {g: group, title: `Group ${req.params.id}`})
    }

    async function addRecipeToGroupForm(req, res){
        const groups = await services.getAllGroups(req.token)
        const recipe= await services.getRecipesWithWord(req.token, req.params.word)
        res.render('addRecipeToGroupForm', {g: groups, r: recipe ,title: "Add a recipe to a group"})
    }

    async function addRecipeToGroup(req,res){
        await services.addRecipeToGroup(req.token,req.params.groupId,req.body.recipeId)
        res.redirect(`/groups/${req.params.groupId}`)
    }

    async function deleteRecipeFromGroup(req,res){
        await services.deleteRecipeFromGroup(req.token,req.params.groupId, req.body.recipeId)
        res.redirect(`/groups/${req.params.groupId}`)
    }
}