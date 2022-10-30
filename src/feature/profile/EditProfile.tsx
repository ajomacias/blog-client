import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { propsLoader } from "../../types/props";
import { sortUser } from "../user/types";
import { findUser } from "../user/userAPI";
import { updateProfile } from "./profileAPI";

function EditProfile() {

  const navigate = useNavigate();

  const { session } = useAuthContext()!;
    
  const data = useLoaderData() as sortUser;

    return (
    <div className="w-full gap-1 p-1 wrap flex flex-col max-w-md" >
        <h1 className="text-center">Editar mi perfil</h1>
       
        <div className="divider"/>
        <p>Hola {data.name} 👋 <br /> 
        Bienvenido a la pagina  para editar tu perfil 😉​ <br />
        Puedes editar tu perfil a tu merced,bueno entre comillas, pronto agregaremos mas opciones
         para que tu perfil se vea mas interesante, por ahora esto se ve muy vacio. <br />
         Estamos trabajando duro para agregar nuevas funcionalidades ​🐌​
        </p>
     
      <Form encType="multipart/form-data" method="post">
        <div className="flex flex-col gap-2" >
          <input type="number" name="user" value={session.id} hidden={true} readOnly={true} />
          <input hidden={true} name="id" type="text" value={data.profile.id} />
     <label className="btn-form bg-black-30 w-full" htmlFor="img">
                Seleccionar una imagen
               <input className="none" name='img' id="img" type="file" />
               </label>
               <label htmlFor="">Descripcion</label>
               <input defaultValue={data.profile.description} name="detail" className="input-border" type="text" />
        <div className="flex gap-2" >
        <button type="submit" className="btn-form" >Guardar</button>
        <button onClick={()=>navigate(-1)} type="button" className="btn-form" >Cancelar</button>
    </div>  
    </div>
    </Form>
    </div> 
    );

  
}

export async function action({ request }:propsLoader){

   const profile = await request?.formData()

   
   const res = await updateProfile(profile!);

   if(!res.success) throw new Response('',{
    status : 500,
    statusText : res.error
   })
    

  return redirect(`/profile/${profile!.get('user')}`);

}

export async function loader({ params }:propsLoader){

  const id = params!.id || '7';

  const res = await findUser(id);
   
  if(!res.success) throw new Response('',{
    status : 500,
    statusText : res.error
  });

  return res.data as sortUser

}

export default EditProfile;