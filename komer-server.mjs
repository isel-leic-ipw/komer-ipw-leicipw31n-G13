//File responsabilities
//1-Include the API modules that configure the server , and provide them its dependencies
//2-Launch the server and wait for requests


import path from 'path'

import express from 'express'

import recipesDataInit from './data/komer-data-mem.mjs' 

const usersData = recipesDataInit()

import {fileURLToPath} from 'url'

import hbs from 'hbs';

import groupsDataInit from './data/komer-data-mem.mjs'
const groupsData = groupsDataInit()

import servicesInit from './services/komer-services.mjs'
const services = servicesInit(groupsData,usersData)

//groups-api returns router
import groupApiInit from './api/komer-web-api.mjs'

import komerWebSiteInit from './api/komer-web-site.mjs'
const komerWebSite = komerWebSiteInit(services)

const groupApi = groupApiInit(services)
const app = express()
const PORT = 1904

//app.use(cors())
app.use(express.json()) //creates a middleware
app.use(express.urlencoded())


app.use("/api",groupApi)
app.use("/" ,komerWebSite)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//view engine setup
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))