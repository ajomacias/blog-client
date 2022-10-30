import { Response as ResponseAPI } from "../../types/ResponseAPI";
import { CommentSave } from "./types";

const comentaryhUrl = 'http://192.168.200.12:3000/api/v1/comentary';
const headers = {
    'Content-Type' : 'application/json'
}

async function getComentaries(postId : number, params : string) : Promise<ResponseAPI> {
    try{
    const res = await fetch(`${comentaryhUrl}/post/${postId}${params}`);
    return await res.json() as ResponseAPI;

    }catch(err){
        return{
            success : false,
            data : null,
            error : err as string

        }

    }

}

async function saveComentary(comentary : CommentSave) {

    const res = await fetch(comentaryhUrl, 
    { 
        method : 'post',
        body : JSON.stringify(comentary),
        headers
    })

    return await res.json() as ResponseAPI ;

}

 async function getComment(id : string):Promise<ResponseAPI>{
    try{ 
        const res = await fetch(`${comentaryhUrl}/${id}`);
 
        return await res.json() as ResponseAPI;

    }catch(err){
        return{
            error : err as string,
            success : false,
            data : null
        }
    }
  
 }


export { saveComentary,getComentaries };