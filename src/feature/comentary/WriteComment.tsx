import { Fragment,  useRef } from "react";
import { Form, useNavigation, useParams } from "react-router-dom";
import { useCommentContext } from "../../providers/ CommentProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { propsLoader } from "../../types/props";
import { saveComentary } from "./commentaryAPI";

function WriteComment(){

    const navigation = useNavigation();
    const { session } = useAuthContext()!;

    const { id } = useParams();
  
    const { socket } = useCommentContext()!;

    const commentRef = useRef<HTMLTextAreaElement>(null);

    const submiting = navigation.state === 'submitting'

    return(
        <Fragment>
        <h3>Enviar comentario</h3>
            <Form  
                method="post">
                <input 
                type="number" 
                hidden={true} 
                readOnly={true} 
                value={session.id} 
                name="user" 
                id="user" 
                />
                <textarea 
                onFocus={handlerFocus}
                onBlur={handlerFocusOut}
                onKeyUp={handleKeyUp} 
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

    function handlerFocus(){
        if(!socket) return;
        socket.emit('write', { id : session.id, post : id });
    }

    function handlerFocusOut(){
        if(!socket) return;
        socket.emit('no-write', { id : session.id, post : id });
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

    return response.data;

}

export default WriteComment;