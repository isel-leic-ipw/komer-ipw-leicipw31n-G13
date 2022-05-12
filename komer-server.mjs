import express from 'express'
const app = express()
const PORT = 8080
app.use(express.json())

import recipesApi from './komer-web-api.mjs'
app.use(recipesApi)

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));


/**
 * This file is responsible for being the entry point into the api
 * 
 */