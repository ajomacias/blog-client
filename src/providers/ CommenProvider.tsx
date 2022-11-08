import { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "../core";
import { Props } from "../types/props";

const commentContext = createContext<null | CommentContext>(null);

function CommentProvider({ children }:Props){

    const socket = getSocket('comment');

    useEffect(()=>{

        socket.connect();
        

        return ()=>{socket.close()};
    },[socket]);

    return (
        <commentContext.Provider value={{ socket }} >
         {children}
        </commentContext.Provider>
    )
}

export function useCommentContext(){
    return useContext(commentContext);
}

export default CommentProvider;

export type CommentContext = {
    socket : Socket
}