import { Response as ResponseAPI } from "../../types/ResponseAPI";

const userUrl = 'http://192.168.200.12:3000/api/v1/user';
const headers = {
    'Content-Type' : 'application/json'
}

export async function findUser( id : string) {

    let res;

    res = await fetch(`${userUrl}/${id}`);

    return await res.json() as ResponseAPI;
    
}

