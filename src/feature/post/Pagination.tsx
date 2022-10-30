import {  useState } from 'react'
import { TablePagination } from "@mui/material";
import { Post, ResponsePost } from "./types";
import { getPosts, searchPosts } from './postAPI';
import { useSearchParams } from 'react-router-dom';

function Pagination({ count, state }: propsPagination) {

    let [searchParams, setSearchParams] = useSearchParams();


    const [paramsPagination, setParamsPagination] = useState<paramsPagination>({
        page: 0,
        limit: 10
    });


    return <TablePagination
    component='div'
        count={count!}
        page={paramsPagination.page}
        rowsPerPage={paramsPagination.limit}
        onPageChange={handlerChangePage}
        onRowsPerPageChange={hanlderLimitChange}
    />

    async function handlerChangePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) {


        setParamsPagination({ ...paramsPagination, page: page });

        state(await getPostsWithParams({ ...paramsPagination, page: page }))



    }

    async function hanlderLimitChange(event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        
        const limit = parseInt(event.target.value, 10);

 
        setParamsPagination({page : 0, limit })

        state(await getPostsWithParams({page : 0, limit}))

    }
    
    async function getPostsWithParams(params : paramsPagination){

        const post =  searchParams.get('search')

let res;
let paramsURL : string = '';
        if(post){
           paramsURL = `?page=${params.page}&limit=${params.limit}&post=${post}`
           
           res = await searchPosts(paramsURL);
        }else{
            paramsURL = `?page=${params.page}&limit=${params.limit}`

            res = await getPosts(paramsURL);

        }
        


        if(!res.success) throw new Response('',{
            status : 500,
            statusText : res.error
        })

        let resPonsePost = res.data as ResponsePost
        

        return resPonsePost.values;


    }



}


type propsPagination = {
    count: number | null,
    state: React.Dispatch<React.SetStateAction<Post[]>>
}

type paramsPagination = {
    page: number
    limit: number
}

export default Pagination;