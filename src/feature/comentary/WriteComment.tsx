import { Fragment, useRef } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { propsLoader } from "../../types/props";
import { saveComentary } from "./commentaryAPI";

function WriteComment(){

    const navigation = useNavigation();
    const { session } = useAuthContext()!;

    const commentRef = useRef<HTMLTextAreaElement>(null);

    const submiting = navigation.state === 'submitting'
    return(
        <Fragment>
        <h3>Enviar comentario</h3>
            <Form method="post" action="create-comment" >
                <input type="number" hidden={true} readOnly={true} value={session.id} name="user" id="user" />
                <textarea onKeyUp={handleKeyUp} 
                className="invicible-scroll input textarea-comment" 
                cols={1} 
                ref={ commentRef }
                name="comment" 
                id="comment"
                placeholder="Escribe un comentario aqui 🙃​"
                aria-placeholder="asdasdasd"
                />
                <div className="flex w-full p-1 wrap main-end" >
                    <button
                        className="btn-clare text-primary" type="submit" >{submiting ? 'cargando' : 'guardar'} </button>
                    <button onClick={handlerCancel} className="btn-clare" type="button" >Cancelar </button>
                </div>
            </Form>
            </Fragment>
    )

    function handleKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const textArea = event.currentTarget;
        textArea.style.height = 'auto'
        textArea.style.height = `${textArea.scrollHeight}px`
    }

    function handlerCancel(){
        commentRef.current!.value = '';
    }
}

export async function action({ params, request }: propsLoader) {

    const idPost = params!['id']!
    const form = await request?.formData()

    const response = await saveComentary({
        description: form!.get('comment')?.toString()!,
        post : idPost,
        user : form!.get('user')!.toString()
    })

    if(!response.success)throw new Response('',{
        status : 500,
        statusText : response.error
    })

    return redirect(`/posts/${idPost}`)

}

export default WriteComment;