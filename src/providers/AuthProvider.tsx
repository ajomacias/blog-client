import { createContext, useContext, useEffect, useState } from "react";
import { ResponseAuth , userByToken} from "../feature/auth/types";
import { auth } from "../types/auth";
import { Props } from "../types/props";
import { getToken, removeToken, setToken } from "../utils/localToken";
import { getUserByToken } from "../feature/auth/authAPI";

const authContext = createContext<AuthCountext | null>(null);


function AuthProvider({children}:Props){

    const [  session, setSession] = useState<auth>({
        id : 0,
        name : '',
        isLogin : false,
    });

    function logIn(credentials : ResponseAuth){

        setToken(credentials.token);
         
        setSession({
           id : credentials.id,
           name : credentials.user,
           isLogin : true,
           img : credentials.profile.img            
        })
    }

    function isLogIn(){
        if(!session.isLogin) return false;
        if(getToken().length < 5) return false;
        return true;
    }

    function logOut(){
        removeToken();
        setSession({ id : 0, isLogin : false, name : '', })
         
    }

    useEffect(()=>{
        onComponentMount();

    },[]);

    return(
        <authContext.Provider value={{
            logIn,
            isLogIn,
            session,
            logOut
        }} >
           {children}
        </authContext.Provider>
    );

    async function onComponentMount(){

     if(isLogIn()) return;

      const res = await getUserByToken();

      if(!res.success) return;
       
      const user = res.data as userByToken;

      setSession({ ...user, isLogin : true, img : user.profile.img })
      
    }
}

export function useAuthContext(){

    return useContext(authContext);

}

export default AuthProvider;

export type AuthCountext = {

    logIn : (credentials : ResponseAuth)=>void,
    isLogIn : ()=> boolean,
    session : auth, 
    logOut : ()=> void
}
