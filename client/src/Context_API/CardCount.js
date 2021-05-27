import React, { createContext, useState } from "react";

export const cardCountContext = createContext();

export const CardCountProvider = ({ children }) => {
  const [cardCount, setCardCount] = useState(0);
  return (
    <cardCountContext.Provider value={{ cardCount, setCardCount }}>
      {children}
    </cardCountContext.Provider>
  );
};
