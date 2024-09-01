import React, { createContext, useState } from 'react';


export const PostContext = createContext();


export const PostProvider = ({ children }) => {
  const [postDetails, setPostDetails] = useState(null); 

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};
