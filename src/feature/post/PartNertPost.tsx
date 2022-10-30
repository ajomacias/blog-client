import { Link } from "react-router-dom";
import { propsPartnertPost } from "./types";

function PartNertPost({data}:propsPartnertPost){
    return(
        <figure className="flex flex-wrap w-full my-2 cross-between h-fit" >
            <div className="flex cross-center gap-1" >
            <Link to={`/profile/${data.user.id}`} > 
            <img className="circle" 
            src={data.user.profile.img} width={30} height={30} alt="" /> 
            </Link>
             <div className="flex flex-col ">

            <p className="m-none" >{data.user.name}</p> 
            <p className="m-none" >{data.date}</p> 

             </div>
             </div>
             <div className="flex gap-2 cross-center" >
             </div>
        </figure>
    )

}

export default PartNertPost; 


