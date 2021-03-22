import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { transport } from './cookieAxios';
import { getAcessToken, setAccessToken } from '../utils/accessToken';

/*
axios pro 
*/
export const jwtTransport = axios.create({
    withCredentials: true
});

/*
axios interceptor pro pridani acess tokenu do headeru 
a v pripade neplatnosti access tokenu ziskat novy acess token
*/
jwtTransport.interceptors.request.use(async function (config) {
    // refresh access token if needed!
    const decodedToken = jwtDecode(getAcessToken());
    if (decodedToken.exp * 1000 <= Date.now()) {
        await transport
            .post('/token/refresh_token', {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
            })
            .catch(err => {
                console.error(err.message);
            });
        // set header
        config.headers = { Authorization: `Bearer ${getAcessToken()}` };
    }

    return config;
}, function (error) {
    // Do something with request error
    console.log(error.message);
    return Promise.reject(error);
});