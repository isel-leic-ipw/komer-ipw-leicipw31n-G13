//----------------------------
import fetch from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'
import {errors} from '../error.mjs'
//import {errors} from '../errors.mjs'

export default function (){
    const INDEX_NAME = 'groups'
    const URI_MANAGER = uriManager(INDEX_NAME)

    return {
        getGroup:getGroup,
        createGroup:createGroup,
    }



function getGroups(){
    return fetch(URI_MANAGER.getAll())
    .then(body => body.hits.hits.map(createGroupFromElastic))

}

function getGroup(userToken,id){
    console.log(`getting name with ${id}`)
    return fetch(URI_MANAGER.get(id)
    .then(createGroupFromElastic(body)))
}


function createGroup(userToken,name,description){
    console.log("updategroup")
}

async function deleteGroup(userToken,id){
    return fetch(URI_MANAGER.getAll(), {method: "DELETE"})
    .then(body => body._id)
}

function createGroupFromElastic(groupElastic){
    let group = groupElastic._source
    group.id = gameElastic._id
    return group 
}
}