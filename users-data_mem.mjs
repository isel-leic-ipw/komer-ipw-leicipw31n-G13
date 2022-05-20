//File responsabilities
//Implement data access to memory storage

import {errors} from './error.mjs'

let nextId = 102

const USERS = [
    {userId: 100,userName : 'User1',authToken:'de469902-4040-47ff-8ea9-5f8ee4efaadc'},
    {userId: 101,userName : 'User2',authToken:'3669e303-5758-4479-b139-94b2475c8554'}
]

export default function(){
    return{
        getUserByToken
    }
    
    async function getUserByToken(token){
        const user = USERS.find(u => u.authToken == token)
        if(!user){
            throw errors.NOT_FOUND("User")
        }
        return user
    }
}