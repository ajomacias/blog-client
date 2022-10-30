import Commentary from "./Commentary";
import { ResponseComments } from "./types";
import './commentary.css';
import WriteComment from "./WriteComment";
import { useEffect, useRef, useState } from "react";
import { getComentaries } from "./commentaryAPI";
import { useNavigation } from "react-router-dom";
import Spinner from "../../global/Spinner";
import { getNextPage } from "../../utils/paginable";

function Comments({ postId }: propsComments) {

    const [data, setData] = useState<ResponseComments>({
        count: NaN,
        values: []
    });

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        componentMount();

        return componentUnMount;

    }, [data]);

    useEffect(()=>{
        OnChangeNavigation();
    },[navigation]);

    const refDiv = useRef<HTMLDivElement>(null);

    let oldScrollY = 0;



    return (
        <div ref={refDiv} className="w-full" >
            <h2>Comentarios<span>({data.count})</span> </h2>

            <WriteComment />

            {data.values.length > 0 &&
                data.values.map((comment, i) => (
                    <Commentary key={i} comentary={comment} />
                ))
            }
            {loading && <Spinner />}
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

    async function handlerScroll(event: Event) :Promise<unknown> {

        const myDiv = refDiv.current;
        if (loading) return;

        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;

        let modifier = 200;


        const { bottom } = myDiv!.getClientRects()[0] as DOMRect;
        if (oldScrollY < bottom) return oldScrollY = bottom;
        oldScrollY = bottom;

        if (currentScroll + modifier < documentHeight) return;

        const nextPage = getNextPage(data.count, data.values.length);

        if (!nextPage) return document.removeEventListener('scroll', handlerScroll);


        setLoading(true)
        let values = await getComments(nextPage.toString());
        let newValues = [...data.values, ...values.values];
        setData({ count: values.count, values: newValues });
        setLoading(false);

    }

    async function componentMount() {

        document.addEventListener('scroll', handlerScroll);
        if (data.count || data.count == 0) return;
        setLoading(true);
        setData(await getComments());
        setLoading(false);

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