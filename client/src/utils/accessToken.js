/*
skladuje access token
setAccessToken nastavi access token
getAcessToken posle acess token
*/
let token = '';

export function setAccessToken(newToken) {
    token = newToken;
}

export function getAcessToken() {
    return token;
}