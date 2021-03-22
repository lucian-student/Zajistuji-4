import React, { useState, useCallback, useRef, useEffect } from 'react';
import { jwtTransport } from '../axios/refreshTokenAxios';
import { getAcessToken, setAccessToken } from '../utils/accessToken';
import axios from 'axios';
import firebase from '../config/firebase';
/*
Ukladá v pameti data o uzivatelovi
*/
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    const loginUser = useCallback(async () => {
        return await jwtTransport
            .get('/users/me', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                },
                cancelToken: source.current.token
            })
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    async function logout() {
        return await jwtTransport
            .delete('/users/logout', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                },
                cancelToken: source.current.token
            })
            .then(res => {
                setAccessToken('');
                setCurrentUser(null);
                firebase.auth().signOut().catch(function (error) {
                    console.error(error.message);
                });
                console.log(res.data);
            })
            .catch(err => console.error(err));

    }
    return (
        <AuthContext.Provider
            value={{
                currentUser, loginUser, logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};