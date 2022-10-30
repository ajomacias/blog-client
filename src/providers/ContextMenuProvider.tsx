import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Props } from "../types/props";

const menuContext = createContext<contextMenuValue | null>(null);


function ContextMenuProvider({children}:Props) {
    
     
    const [ opt, setOpt ] = useState<opt>({
        active : false,
        mouseX : 0,
        mouseY : 0
    });

    return(
        <menuContext.Provider value={{
           opt,
           setOpt 
        }} >
            {children}

        </menuContext.Provider>
      
    );

}

export function useMenuContext(){
    return useContext(menuContext);
}

type contextMenuValue = {
    opt: opt,
    setOpt: React.Dispatch<React.SetStateAction<opt>>
}

type opt = {

    mouseX : number,
    mouseY : number,
    active : boolean

}

export default ContextMenuProvider;