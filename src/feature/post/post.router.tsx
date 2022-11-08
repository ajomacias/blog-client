import { RouteObject } from "react-router-dom";
import Post, { loader as PostLoader } from "./Post";
import { action as commentAction } from '../comentary/WriteComment'
import Posts from "./Posts";
import { action as newPostAction } from "./NewPost";
import { loader as PostsLoader } from "./Posts";
import NewPost from "./NewPost";

const postRoutes : RouteObject[] = [

    {
        index : true,
        element : <Posts />,
        loader : PostsLoader,   
    
    },
    {
        path : ':id',
        element : <Post />,
        loader:PostLoader
    },
    {
        path : ':id/create-comment',
        action :  commentAction
    },
    {
        path : 'new',
        element : <NewPost />,
        action : newPostAction
    }
];

 export default postRoutes;