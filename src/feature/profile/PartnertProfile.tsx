import React from "react";
import ContextMenu from "../../global/ContextMenu";
import { useMenuContext } from "../../providers/ContextMenuProvider";
import { PostUser } from "../post/types";
import ContextMenuProfile from "./ContextMenuProfile";

function PartNertProfile({ user } : props){

    const { setOpt } = useMenuContext()!;


    return(
        <div className="flex wrap flex-col w-full" >

            <figure className="relative m-none flex-col ">

                <div onContextMenu={handleContextMenu} className="images-partnert circle-sm" >

                  <img src={ user?.profile && user.profile.img ? user.profile.img : '/user.jpg' } alt="" />

                </div>
                <div className=" w-full px-2 flex wrap main-between" >
                    <div className="flex flex-col" > 
                    <h1 className="m-none">{user.name}</h1>
                    <blockquote className="m-none" >
                    { user.profile && user.profile.description }
                    </blockquote>     
                    </div>
                    <p >{user.created}</p>
                </div>
            </figure>

            <ContextMenu >
                <ContextMenuProfile />
            </ContextMenu>
        </div>
    )
    function handleContextMenu(event : React.MouseEvent<HTMLDivElement, MouseEvent>){
       
        const {clientX, clientY  } = event;

        setOpt({
            active : true,
            mouseX : clientX,
            mouseY : clientY
        });

       event.preventDefault();
    }
}

export default PartNertProfile;

type props ={
    user : PostUser
}