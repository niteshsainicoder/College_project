import { createContext, useContext } from "react";

export const Context = createContext();

export const ContextProvider = Context.Provider;

export function useUCP() {
  return useContext(Context);
}
