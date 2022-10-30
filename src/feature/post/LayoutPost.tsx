import { Outlet } from "react-router-dom";
import Toolbar from "./Tolbaar";

function LayoutPost(){
    return( 
        <div className="max-w-md flex flex-col p-2 w-full" >
        <Toolbar/>
        <div className="divider" ></div>
        <Outlet />
        </div>
    )

}

export default LayoutPost;