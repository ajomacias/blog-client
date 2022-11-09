import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "../core";
import { Props } from "../types/props";

const commentContext = createContext<null | CommentContext>(null);

function CommentProvider({ children }:Props){

    const [ socket, setSocket ] = useState<null | Socket>(null);

    useEffect(()=>{
        const newSocket = getSocket('comment');

        setSocket(newSocket);

        return ()=>{
            if(!socket) return
            socket.close();};
    },[setSocket]);

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
    socket : Socket | null
}