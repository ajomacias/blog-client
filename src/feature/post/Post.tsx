import { useLoaderData, useNavigation } from "react-router-dom";
import { propsLoader } from "../../types/props";
import Comments from "../comentary/Comments";
import PartNertPost from "./PartNertPost";
import { PostUnique } from "./types";
import { getPost } from "./postAPI";
import CommentProvider from "../../providers/ CommenProvider";

function Post(){

    const post = useLoaderData() as PostUnique;

    return(
            <div className="w-full" > 
            <PartNertPost data={{user : post.user, date : post.created}} />
            <div className="flex wrap flex-col" > 
                <h1>{post.name}</h1>
                <p className="pre-wrap" >{post.description}</p>
            </div>
            <div className="divider"></div>
            <CommentProvider>
            <Comments postId={post.id} />
            </CommentProvider>
            </div> 
    )

 
}

export async function loader({ params } :propsLoader) {

    const res = await getPost(params!['id']!)

    if(res.success) return res.data as PostUnique;

    throw new Response('',{
        statusText : res.error
    });
    
} 

export default Post;