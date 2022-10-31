import { ActionFunction, Form, Link, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { sigUp } from "./authAPI";

function SigUp() {

    return (
        <div className="flex h-all-screen main-center cross-center" >

            <Form method="post" id="auth">
                <div className="card  relative " >
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
                    <Link className='link' to='/' >Iniciar sesion</Link>
                </div>


            </Form>

        </div>
    )
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const userObject =  Object.fromEntries(formData);
    const res = await sigUp(userObject);

    if(res.success) return redirect('/auth');

    return redirect('');

}

export default SigUp;