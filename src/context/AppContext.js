import React, { createContext } from "react";
import useFirebase from "../hooks/useFirebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const firebase = useFirebase();
  return (
    <AppContext.Provider value={{ firebase }}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
