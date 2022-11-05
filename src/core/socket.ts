import { io } from "socket.io-client"
import { env } from "../enviroments/enviroment"

export function getSocket(roomName : string){

    const room = `${env.socket}/${roomName}`;

    const socket = io(room);

    return socket;

}