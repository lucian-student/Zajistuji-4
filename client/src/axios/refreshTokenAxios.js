import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { transport } from './cookieAxios';
import { getAcessToken, setAccessToken } from '../utils/accessToken';
export const jwtTransport = axios.create({
    withCredentials: true
});


jwtTransport.interceptors.request.use(async function (config) {
    // refresh access token if needed!
    const decodedToken = jwtDecode(getAcessToken());
    if (decodedToken.exp * 1000 <= Date.now()) {
        await transport
            .post('http://localhost:5000/token/refresh_token', {
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