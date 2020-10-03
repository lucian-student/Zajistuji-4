import React, { useState, useCallback } from 'react';
import { jwtTransport } from '../axios/refreshTokenAxios';
import { getAcessToken, setAccessToken } from '../utils/accessToken';
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const loginUser = useCallback(async () => {
        return await jwtTransport
            .get('http://localhost:5000/users/me', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    async function logout() {
        return await jwtTransport
            .delete('http://localhost:5000/users/logout', {
                headers: {
                    'Authorization': 'Bearer ' + getAcessToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                setAccessToken('');
                setCurrentUser(null);
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