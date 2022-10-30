export function getToken(){

    const token = window.localStorage.getItem('session_token') || ''

    return token

}

export function removeToken(){
    window.localStorage.removeItem('session_token');
}

export function setToken(token : string){

    window.localStorage.setItem('session_token', token);

}