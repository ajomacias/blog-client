import { PostUser } from "../post/types";

export interface Comment {
    id:          number;
    description: string;
    user:        PostUser;
    created : string
}

export type CommentSave = {
    description : string,
    user : string,
    post : string
}

export type ResponseComments = {
    count : number,
    values : Comment[]
}