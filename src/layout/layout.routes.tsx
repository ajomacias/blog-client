import { redirect, RouteObject } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import Home from "../feature/home/Home";
import LayoutPost from "../feature/post/LayoutPost";
import postRoutes from "../feature/post/post.router";
import profileRoutes from "../feature/profile/profile.routes";


const layoutRoutes: RouteObject[]= [
    {
        index :true,
        loader: ()=>redirect('/home')
    },
    {
        errorElement :< ErrorBoundary />,
        children : [
            {
                path : '/home',
                element : <Home />
            },
            {
                path : '/posts',
                element : <LayoutPost />,
                children : postRoutes
        
            },
            {
                path : '/profile',
                children : profileRoutes
            }

        ]
    }



]

export default layoutRoutes;