export interface ResponseAuth {
    id:    number;
    token: string;
    user:  string;
    profile : profile
}
 
export type user = {
    name: string,
    password: string
}

export type userByToken = {
    id : number,
    name : string,
    profile : profile
}

type  profile = {
    img : string
}
