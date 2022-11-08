export const env : enviroment = {

    url : 'http://localhost:3000',
    socket : 'ws://localhost:8080'

}

type enviroment = {
    [ key : string ] : string
}