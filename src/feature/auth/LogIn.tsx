import { ActionFunction, Form, Link, redirect, useActionData, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { logIn } from "./authAPI";
import { ResponseAuth } from "./types";

function LogIn() {
    const data = useActionData() as ResponseAuth | null;
    const auth = useAuthContext()!;
    const navigation = useNavigate();

    componentOnMount();

    return (
        <div className="flex h-all-screen main-center cross-center" >

            <Form method="post" id="auth">
                <div className="card relative" >
                    <label className="w-full">
                        Nombre
                    </label>
                    <input
                        placeholder="Nombre usuario"
                        className="input" type="text" name="name" />


                    <label>
                        Contrasena
                    </label>
                    <input
                        placeholder="Contrasena de usuario"
                        className="input" type="text" name="password" />

                    <button className="btn-form" >Submit</button>
                    <Link className='link' to='sigUp' >No tengo cuenta</Link>
                    <Link className="link" to='' > Olvide mi contrasena</Link>
                </div>

            </Form>

        </div>
    )

    function componentOnMount() {

        if (!Boolean(data)) return;

        auth!.logIn(data!);

        navigation('/home');
    }


}

export const action: ActionFunction = async ({ request }) => {


    const formData = await request.formData();

    const userObject = Object.fromEntries(formData);

    const res = await logIn(userObject);
    if (!res.success) return redirect('auth')




    return res.data;

}



export default LogIn;