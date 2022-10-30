import PartNertPost from "../post/PartNertPost";
import { Comment } from "./types";

function Commentary({ comentary }:propsComentary){
 return(
    <div className="w-full comment-card flex flex-col" >
        <PartNertPost  data={{user : comentary.user, date : comentary.created}} />
        <p>{comentary.description}</p>
    </div>
 )
}

export default Commentary;

type propsComentary = {
    comentary : Comment

}