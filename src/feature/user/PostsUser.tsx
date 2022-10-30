import { useEffect, useRef, useState } from "react";
import Spinner from "../../global/Spinner";
import { getPostsByUser } from "../post/postAPI";
import PostUser from "./PostUser";
import { responsePostUser } from "./types";
import { getNextPage } from "../../utils/paginable";
import { PostUser as postUser } from "../post/types";

function PostsUser({ user }: props) {

    const [data, setData] = useState<responsePostUser>({
        count: NaN,
        values: []
    });

    const [loading, setLoading] = useState(false);

    let oldScrollY = 0;

    useEffect(() => {

        componentMount();

        return componentUnMount

    }, [data, loading]);

    const refDiv = useRef<HTMLDivElement>(null)

    return (
        <div ref={refDiv} className="flex flex-col" >
            <h1 className="text-center" >Total posts({data.count})</h1>

            {!data.values.length ?
                <h1>El usuario no ha publicado nada</h1>

                :
                data.values.map((post, i) => (
                    <PostUser key={i} post={post} user={user} />
                ))
            }
            {loading && <Spinner />}

        </div>
    )

    async function getPosts(id: number, params = '') {

        const queryParams = params && `?page=${params}`;

        let res = await getPostsByUser(id, queryParams);

        if (!res.success) throw new Response('', {
            status: 500,
            statusText: res.error
        });

        return res.data as responsePostUser;

    }

    async function handlerScroll(event: Event): Promise<unknown> {

        const myDiv = refDiv.current;
        if (loading) return;

        let documentHeight = document.body.scrollHeight;

        let currentScroll = window.scrollY + window.innerHeight;

        const modifier = 200;

        const { bottom } = myDiv!.getClientRects()[0] as DOMRect;
        if (oldScrollY < bottom) return oldScrollY = bottom;
        oldScrollY = bottom;

        if (currentScroll + modifier < documentHeight) return;


        const nextPage = getNextPage(data.count, data.values.length);


        if (!nextPage) return document.removeEventListener('scroll', handlerScroll);

        setLoading(true)
        let { values } = await getPosts(user.id, nextPage.toString());
        let newValues = [...data.values, ...values];
        setData({ ...data, values: newValues });
        setLoading(false);


    }

    async function componentMount() {
        document.addEventListener('scroll', handlerScroll);

        if (Boolean(data.count || data.count == 0)) return;

        setLoading(true);
        setData(await getPosts(user.id));
        setLoading(false);

    }

    function componentUnMount() {
        document.removeEventListener('scroll', handlerScroll);
    }

}

export default PostsUser;

type props = {
    user: postUser
}