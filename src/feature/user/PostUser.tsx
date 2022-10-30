import { Link } from "react-router-dom";
import PartNertPost from "../post/PartNertPost";
import { postUserSort } from "./types";

function PostUser({ post, user }: postUserSort) {

    return (
        <div className="h-fit w-full" >
            <PartNertPost data={{ user: user, date: post!.created! }} />
            <div className="flex wrap flex-col" >
                <h1>{post.name}</h1>
            </div>
            <div className="flex wrap p-2" >
                <Link className="btn-form w-fit px-4 py-1 " to={`/posts/${post.id}`} >         
                Ver
                </Link>
            </div>
            <div className="divider"></div>
        </div>
    )

}

export default PostUser;

