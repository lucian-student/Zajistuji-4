import React, { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(0);

    const source = useRef(axios.CancelToken.source());
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled');
        }
    }, []);
    return (
        <CommentsContext.Provider value={{
            comments,
            setComments,
            commentsPage,
            setCommentsPage,
            source: source.current
        }}>
            {children}
        </CommentsContext.Provider>
    )
}