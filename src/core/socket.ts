import { io } from "socket.io-client"
import { env } from "../enviroments/enviroment"

export function getSocket(nameSpace : string){

    const room = `${env.socket}/${nameSpace}`;

    const socket = io(room, {
        autoConnect : false
    });




    return socket.connect();

}