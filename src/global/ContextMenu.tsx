import React, { useEffect } from "react";
import { useMenuContext } from "../providers/ContextMenuProvider"
import { Props } from "../types/props";

function ContextMenu ({children}:Props){

    const { opt, setOpt } = useMenuContext()!;

    useEffect(()=>{
      onMount();

      return onUnMount;

    },[])
    
    
    return(
         <div
         onClick={handleClikInMenu} 
         style={{ top: `${opt.mouseY}px`, left : `${opt.mouseX}px` }}  
         className={`context-menu ${opt.active && 'visible'}` } >
           {children}
         </div>
    )

    function handleClikInMenu(event : React.MouseEvent<HTMLDivElement, MouseEvent>){

      event.stopPropagation();

    }

    function handleClikScope(event : MouseEvent){
      
      setOpt({...opt, active : false});

    }

    function onMount(){
      document.body.addEventListener('click', handleClikScope);
    }

    function onUnMount(){
      document.body.removeEventListener('click', handleClikScope);
    }

}

export default ContextMenu;