import axios from 'axios';

/*
axios pro api s cookie 
*/
export const transport = axios.create({
    withCredentials: true
});

