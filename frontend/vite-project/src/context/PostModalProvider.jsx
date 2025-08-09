import React, { useState } from "react";
import PostModalContext from "./PostModalContext";

const PostModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PostModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PostModalContext.Provider>
  );
};

export default PostModalProvider;
