//File responsabilities
//1-Include the API modules that configure the server , and provide them its dependencies
//2-Launch the server and wait for requests

import express from 'express'

import recipesdataInit from './komer-data-mem.mjs'

const groupData = recipesdataInit()


import servicesInit from './komer-services.mjs'
const services = servicesInit(groupData)

//groups-api returns router
import groupApiInit from './komer-web-api.mjs'
const groupApi = groupApiInit(services)
const app = express()
const PORT = 1904

app.use(express.json()) //creates a middleware

app.use("/api",groupApi)

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))