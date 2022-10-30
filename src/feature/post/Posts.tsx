import { useLoaderData,useNavigation } from 'react-router-dom';
import { Post, ResponsePost } from './types';
import './post.css'
import { getPosts, searchPosts } from './postAPI';
import { propsLoader } from '../../types/props';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import PostUser from '../user/PostUser';

function Posts() {



  const data = useLoaderData() as ResponsePost;

  const [ posts, setPosts ] = useState<Post[]>([]);


  useEffect(()=>{
     setPosts(data.values)
  }, [data])

  return (

      <div className="flex py-1 flex-col wrap w-full" >
        {posts.length === 0 ? <h1>No se han creado publicaciones aun :(</h1>
            : (
              <>
              <div className='flex wrap gap-2 main-end' >
              <Pagination count={data.count} state={setPosts} />
              </div>
              {posts.map((post, index) => (  
              <PostUser key={index} post={post} user={post!.user!} ></PostUser>
            
            ))}
            </>
            )
        }
    </div>
  )

}

export async function loader({ request } :propsLoader) {
  
  let res;

  const url = request?.url;
  const urlParams = new URL(url!);
  const search = urlParams.searchParams.get('search')

  if(!!search && search.length > 3) res = await searchPosts(`?post=${search}`);
  else res = await getPosts();

  if (res.success == false) throw new Response('', {
    status: 500,
    statusText: res.error,

  })


  return res.data;

}

export default Posts;