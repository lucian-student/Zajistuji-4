import axios from 'axios';

export const transport = axios.create({
    withCredentials: true
});