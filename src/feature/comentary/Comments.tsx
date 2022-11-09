import Commentary from "./Commentary";
import { ResponseComments,Comment } from "./types";
import WriteComment from "./WriteComment";
import { useEffect, useRef, useState } from "react";
import { getComentaries } from "./commentaryAPI";
import { useActionData, useNavigation } from "react-router-dom";
import Spinner from "../../global/Spinner";
import { getNextPage } from "../../utils/paginable";
import { useCommentContext } from "../../providers/ CommentProvider";
import './commentary.css';
import { loadType } from "../post/types";
import Load from "./Load";

function Comments({ postId }: propsComments) {

    const [data, setData] = useState<ResponseComments>({
        count: NaN,
        values: []
    });

    const dataAction = useActionData();


    const [ countWrite, setCountWrite ] = useState(0);

    const { socket } = useCommentContext()!;


    const [load, setLoad] = useState<loadType>({
        loading : false,
    });

    useEffect(() => {
        componentMount();

        return componentUnMount;

    }, [data]);



    useEffect(()=>{

        if(!dataAction) return;

        setData({count : data.count + 1,values : [dataAction as Comment,...data.values]});
        
        if(!socket) return;

        socket.emit('comment', {...dataAction, post : `${postId}`});

    },[dataAction]);


    useEffect(()=>{
        
        if(!socket) return;

        socket!.on('no-write',()=>{


            if(!countWrite) return;

            setCountWrite(countWrite - 1);

        });

    },[countWrite]);


    useEffect(()=>{

        if(!socket) return;
        socket.emit('join', { 
            post :`${postId}`,
            user : 'Ander'  
        })

        socket.on('write', (args)=>{
           setCountWrite(countWrite + 1);
        });

        socket.on('comment', (comment)=>{
            setData({count : data.count + 1,values : [comment as Comment,...data.values]});

        });

    },[socket]);

    const refDiv = useRef<HTMLDivElement>(null);

    let oldScrollY = 0;


    return (
        <div ref={refDiv} className="w-full" >
            <h2>Comentarios<span>({data.count})</span> </h2>
            <WriteComment />
            {Boolean(countWrite) && <Load  message={'alguien esta escribiendo'}/> }
            {data.values.length > 0 &&
                data.values.map((comment, i) => (
                    <Commentary key={i} comentary={comment} />
            ))
            }
            {load.loading && <Spinner />}
            <div className="mb-2" ></div>
            {Boolean(countWrite) && <Load  message={'alguien esta escribiendo'}/> }
            <WriteComment />
          
        </div>
    )

    async function getComments(params = '') {

        const queryParams = `?page=${params}`

        const res = await getComentaries(postId, queryParams)

        if (!res.success) throw new Response('', {
            status: 500,
            statusText: res.error
        });

        return res.data as ResponseComments;

    }

    async function handlerScroll() :Promise<unknown> {

        const myDiv = refDiv.current;
        if (load.loading) return;

        const documentHeight = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        let modifier = 200;

        const { bottom } = myDiv!.getClientRects()[0] as DOMRect;
        if (oldScrollY < bottom) return oldScrollY = bottom;
        oldScrollY = bottom;

        if (currentScroll + modifier < documentHeight) return;

        const nextPage = getNextPage(data.count, data.values.length);

        if (!nextPage) return document.removeEventListener('scroll', handlerScroll);


        setLoad({...load, loading : true})
        const values = await getComments(nextPage.toString());
        const newValues = [...data.values, ...values.values];
        setData({ count: values.count, values: newValues });
        setData({ count: values.count, values: newValues });
        setLoad({...load, loading : false})
    }

    async function componentMount() {

        document.addEventListener('scroll', handlerScroll);
        if (data.count || data.count == 0) return;
        setLoad({...load, loading : true})
        setData(await getComments());
        setLoad({...load, loading : false});

    }
    function componentUnMount() {
        document.removeEventListener('scroll', handlerScroll);
    }

}

export default Comments;

type propsComments = {

    postId: number

}