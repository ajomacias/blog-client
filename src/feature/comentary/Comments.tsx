import Commentary from "./Commentary";
import { ResponseComments } from "./types";
import WriteComment from "./WriteComment";
import { useEffect, useRef, useState } from "react";
import { getComentaries } from "./commentaryAPI";
import { useNavigation } from "react-router-dom";
import Spinner from "../../global/Spinner";
import { getNextPage } from "../../utils/paginable";
import { useCommentContext } from "../../providers/ CommenProvider";
import './commentary.css';
import { loadType } from "../post/types";
import Load from "./Load";

function Comments({ postId }: propsComments) {

    const [data, setData] = useState<ResponseComments>({
        count: NaN,
        values: []
    });

    const [ countWrite, setCountWrite ] = useState(0);

    const { socket } = useCommentContext()!;

    const navigation = useNavigation();

    const [load, setLoad] = useState<loadType>({
        loading : false,
    });

    useEffect(() => {
        componentMount();

        return componentUnMount;

    }, [data]);

    useEffect(()=>{
        OnChangeNavigation();
    },[navigation]);


    useEffect(()=>{

        socket.on('no-write',()=>{


            if(!countWrite) return;

            setCountWrite(countWrite - 1);

        });

    },[countWrite])


    useEffect(()=>{

        socket.emit('join', { 
            post :`${postId}`,
            user : 'Ander'  
        })

        socket.on('write', (args)=>{
           setCountWrite(countWrite + 1);
        });

        return ()=>{ socket.close() };

    },[socket])

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
            <WriteComment />
            {Boolean(countWrite) && <Load  message={'alguien esta escribiendo'}/> }
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
        setLoad({...load, loading : false})

    }
    function componentUnMount() {
        document.removeEventListener('scroll', handlerScroll);
    }

   async function OnChangeNavigation(){
        if(navigation.state == 'idle') setData(await getComments())
    }

}

export default Comments;

type propsComments = {

    postId: number

}