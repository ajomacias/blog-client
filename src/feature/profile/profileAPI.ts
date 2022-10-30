import { Response as ResponseAPI } from "../../types/ResponseAPI";

const postUrl = 'http://192.168.200.12:3000/api/v1/profile';
const headers = {
    'Content-Type' : 'application/json'
}

async function getPosts(params : string = '') : Promise<ResponseAPI> {
    try{
    const res = await fetch(`${postUrl}${params}`);
    return await res.json() as ResponseAPI;

    }catch(err){
        return{
            success : false,
            data : null,
            error : err as string

        }

    }

}

async function savePost(comentary : Object) :Promise<ResponseAPI>{

    const res = await fetch(postUrl, 
    { 
        method : 'post',
        body : JSON.stringify(comentary),
        headers
    })

    return await res.json() as ResponseAPI;

}

async function searchPosts(params:string):Promise<ResponseAPI> {
    try{
        const res = await fetch(`${postUrl}/search${params}`)
        return await res.json()

    }catch(err){
        return{
            data : null,
            error : err as string,
            success : false
        }

    }

    
}


async function updateProfile(profile : FormData):Promise<ResponseAPI>{
    try{ 
        const res = await fetch(`${postUrl}`,
        {
            method : 'PUT',
            body : profile,

        });
 
        return await res.json() as ResponseAPI;

    }catch(err){
        return{
            error : err as string,
            success : false,
            data : null
        }
    }
  
 }

 async function getPost(id : string):Promise<ResponseAPI>{
    try{ 
        const res = await fetch(`${postUrl}/${id}`);
 
        return await res.json() as ResponseAPI;

    }catch(err){
        return{
            error : err as string,
            success : false,
            data : null
        }
    }
  
 }

 async function getPostsByUser(idUser:number, params='') {

    const res = await fetch(`${postUrl}/user/${idUser}${params}`);

    return await res.json() as ResponseAPI;
    
 }

export { getPost,getPosts, searchPosts, savePost, getPostsByUser, updateProfile };