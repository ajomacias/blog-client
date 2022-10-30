import { Link } from "react-router-dom";

function ContextMenuProfile(){

    return(
    <div className="card  p-1 bg-white gap-none" >
        <Link className="btn-clare px-4 text-black " to='edit' > Ver foto </Link>
        <Link className="btn-clare px-4 text-black " to='edit' > Editar perfil </Link>
        <Link className="btn-clare px-4 text-black " to='edit' > Eliminar foto </Link>
       
    </div>
    )
}

export default ContextMenuProfile;