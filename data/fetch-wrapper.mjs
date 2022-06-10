import fetch from 'node-fetch'

const URI_PREFIX="http://localhost:9200"

export default async function(uri) {
        console.log(`Fetching from ${uri} with these options ${init}`)
       return fetch(uri,{accept:"application/json"})
        .then(response => response.json())
        .then(showResponse)

        function showResponse(body){
            console.log(`Received from ${uri}`)
            console.log(body)

            return body
        }
    }