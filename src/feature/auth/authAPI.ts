import { Response  } from "../../types/ResponseAPI";

const authUrl = 'http://192.168.200.12:3000/api/v1/auth';
const headers = {
    'Content-Type' : 'application/json'
}

async function logIn(user: Object) {

    const res = await fetch(`${authUrl}/logIn`,
        {
            method : 'POST',
            body: JSON.stringify(user),
            headers
        }
    )
    return await res.json() as Response 
}

async function sigUp(user : Object){
    const res = await fetch(`${authUrl}/register`,
        {
            method : 'POST',
            body : JSON.stringify(user),
            headers
        })
 
        return await res.json() as Response;
}

async function getUserByToken() {
    const res = await fetch(authUrl);
    return await res.json() as Response
}

export {logIn, sigUp, getUserByToken };