import { Form, redirect } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider";
import { propsLoader } from "../../types/props";
import { savePost } from "./postAPI";

function NewPost() {

    const { session } = useAuthContext()!;

    return (
        <div className="h-all-screen py-2" >
            <div className="flex w-full cross-center main-between" >
                <h1>New post</h1>
                <div className="flex gap-1" >
                    <button className="btn-clare " >Cancelar</button>
                    <button onClick={handlerClickAccept} className="btn-clare text-primary" >Aceptar</button>

                </div>
            </div>
            <Form id="new-post" method="post" >
                <div className="flex flex-col gap-2" >
                    <input type="number" hidden={true} readOnly={true}  name="user" value={session.id} />
                    <label htmlFor="title">Titulo</label>
                    <input className="input" type="text" name="name" id="title" />
                    <label htmlFor="title">Descripcion</label>
                    <textarea className="textarea" name="description" id="" cols={30} />
                    <button id="accept" type="submit" hidden ></button>
                </div>
            </Form>
        </div>
    )

    function handlerClickAccept() {
        const accept = document.getElementById('accept') as HTMLButtonElement;
        accept.click()

    }

}

export async function action({ request }: propsLoader) {

    const form = await request?.formData();
    const obj = Object.fromEntries(form!);
    const res = await savePost(obj);

    if(!res.success) throw new Response('',{
        status : 500,
        statusText : res.error
    })

    return redirect('/posts')
    
}

export default NewPost;