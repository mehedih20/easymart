import React, { createContext, useState } from "react";
import useFirebase from "../hooks/useFirebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [editItem, setEditItem] = useState(null);
  const firebase = useFirebase();
  return (
    <AppContext.Provider
      value={{
        firebase,
        editItem,
        setEditItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
