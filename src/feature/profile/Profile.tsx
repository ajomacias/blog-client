import { useLoaderData } from 'react-router-dom';
import { propsLoader } from '../../types/props';
import { PostUser as postUser } from '../post/types';
import PostsUser from '../user/PostsUser';
import { sortUser } from '../user/types';
import { findUser } from '../user/userAPI';
import PartNertProfile from './PartnertProfile';
import './profile.css'

function Profile(){


    const user = useLoaderData() as postUser;

    return(
        <div className="flex cross-center max-w-md w-full flex-col" >
            <PartNertProfile  user={user} />
            <div className='divider w-full m-2' ></div>

            <div className='flex w-full px-2 flex-col'>
             <PostsUser user={user} />
            </div>
        </div>
    )
}

export async function loader({ params }: propsLoader){

    const id = params!.id!;
    
    const res = await findUser(id);

    if(!res.success) throw new Response('',{
        status : 500,
        statusText : res.error
    });

    return res.data as sortUser;

} 

export default Profile;