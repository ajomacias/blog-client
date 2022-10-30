import { Link} from "react-router-dom";
import './home.css'

function Home(){

    return(
        <div className="h-all-screen p-2 w-full cross-center
        wrap flex flex-row gap-2 cross-center main-center" >    

        <div className="flex flex-col card-text-home gap-2" >
            <h1 className="title" >Hola!! <br/> Bienvenido a mi blog :)</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur deserunt aut blanditiis excepturi at cum explicabo ea modi odio! Quia repellat totam provident libero inventore nemo enim voluptatibus deserunt asperiores.
            </p>

            <Link to='/posts' replace={false} className="btn-form" > 
            Go it!
        </Link>
        </div>

        <div className="w-fit " > 

            <div className="img-home" ></div> 
 
        </div>
      
        </div> 
    )


}

export default Home;