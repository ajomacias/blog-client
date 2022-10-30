import { useRouteError } from "react-router-dom";

export default function ErrorBoundary (){

    const error = useRouteError() as Response;

    return(
        <div className="h-all-screen flex main-center cross-center" >

            <div className="w-fit flex flex-col" >
                Error
                <h2>{error!.status}</h2>
                <h2>{error!.statusText}</h2>
            </div>

        </div>
    )

}

type error ={
    status : string,
    data : data
}

type data ={
    sorry : string
}
