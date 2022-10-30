import { RouteObject } from "react-router-dom";
import './auth.css';
import LogIn, { action as logInAction } from "./LogIn";
import SigUp, { action as sigupAction } from "./SigUp";

const authRouter :RouteObject[]= [
    {
        path : '',
        element :<LogIn />,
        action : logInAction,
    },
    {
        path : 'sigUp',
        element : <SigUp />,
        action : sigupAction
    }

]



export default authRouter;