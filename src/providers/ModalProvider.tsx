import { createContext, ReactNode, useState } from "react";
import { Props } from "../types/props";

const modalContext = createContext({

})

function ModalProvider({children}:Props){

    const [isOpen, setIsOpen] = useState(false);
    
    function changeState(){ setIsOpen(!isOpen) };

    let modal : ReactNode = <></>;

    function open(component : ReactNode){
     
        modal = component;

        changeState();

    }



    return(
        <modalContext.Provider value={{changeState, open}} >
            {children}
        </modalContext.Provider>

    )

}
export default ModalProvider;