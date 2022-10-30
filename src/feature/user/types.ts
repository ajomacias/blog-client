import { Post, PostUser } from "../post/types"
import { Profile } from "../profile/types"

export type userPartnert ={
    date : string
    user : PostUser
}

export type sortUser ={
    created: string;
    id:      number;
    name:    string;
    profile: Profile;
}
 
export type responsePostUser={
    count : number,
    values : Post[]
}

export type postUserSort ={
    post : Post,
    user : PostUser
    
}