import React, { createContext, useContext, useReducer } from "react";
import { rootReducer } from "./rootReducer";

const initialState = {
  user: undefined,
  message: []
};

export const Store = createContext();
export const useStoreValue = () => useContext(Store);

export function StoreProvider({ children }) {
  return (
    <Store.Provider value={useReducer(rootReducer, initialState)}>
      {children}
    </Store.Provider>
  );
}
