import { Comment } from "../comentary/types";
import { userPartnert } from "../user/types";

export interface PostUnique {
    id:          number;
    name:        string;
    description: string;
    created:     string;
    user:        PostUser;
    comentaries: Comment[];
}


export interface PostUser {
    id:      number;
    name:    string;
    profile: Profile;
    created : string
}

export interface Profile {
    id:          number;
    description: string;
    img:         string;
}


export interface Post {
    id:          number;
    name:        string;
    description: string;
    user:        PostUser | null;
    created : string | null
}

export interface ResponsePost{
    values : Post[]
    count : number

}

export type propsPartnertPost = {
    data : userPartnert
}