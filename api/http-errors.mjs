import {errorCodes} from '../error.mjs'

export default function(e){
    console.log(e)
    //Assigning each http error to a previous built error
    switch(e.code) {
        case errorCodes.INVALID_ARGUMENT: return {status:400, body:{error:e.message}}
        case errorCodes.NOT_FOUND: return {status:404, body : {error: e.message}}
        case errorCodes.REPEATED_VALUE : return {status:400 , body:{error:e.message}}
        case errorCodes.INVALID_TOKEN : return {status:401 , body:{error:"Not authorized"}}
        case errorCodes.INVALID_USER : return {status:401 , body:{error:e.message}}
        default: return {status: 500, body:{error: 'Unknown error. Contact the application administrator'}}
    }
}