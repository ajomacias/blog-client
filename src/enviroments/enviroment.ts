export const env : enviroment = {

    url : 'http://ec2-52-201-246-197.compute-1.amazonaws.com:3000/',
    socket : 'ws://localhost:8080'

}

type enviroment = {
    [ key : string ] : string
}