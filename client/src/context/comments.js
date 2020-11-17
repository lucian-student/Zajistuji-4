import React, { createContext, useState } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [commentsPage, setCommentsPage] = useState(0);
    return (
        <CommentsContext.Provider value={{
            comments,
            setComments,
            commentsPage,
            setCommentsPage
        }}>
            {children}
        </CommentsContext.Provider>
    )
}