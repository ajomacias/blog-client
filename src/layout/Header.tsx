import { NavLink } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";

function Header() {

    const { isLogIn, logOut, session } = useAuthContext()!;

    return (
    <nav className="header" >
        <ul>
            <li>
                <NavLink className={setClassNavLink} to='/home' >Home</NavLink>
            </li>
            <li>
                <NavLink className={setClassNavLink} to='/posts' >Posts</NavLink>
            </li>
            <li>
                {!isLogIn() &&  
                 <NavLink className={setClassNavLink} to='/auth' >
                 LogIn
            </NavLink>
                }
                
            </li>
            <li>
                {isLogIn() &&  
                 <a className="nav-link" onClick={logOut} > LogOut </a>
                }
                
            </li>
          
            <li>{isLogIn() &&
                <NavLink className={setClassNavLink} to={`/profile/${session.id}`} >
                    <img className="circle" width={30} height={30}  src={session.img} alt="" />
                </NavLink>
                }
            </li>
        </ul>
    </nav>
    )
 
    function setClassNavLink({ isActive, isPending }:props){ 
  
        return isActive ? 'nav-link nav-active' : 'nav-link';   

    }
}

type props= {
    isActive : boolean,
    isPending : boolean
}


export default Header;