import React, { useState, createContext } from "react";
import { GlobalContextType, GlobalProviderProps } from "../types/global";

const GlobalContext = createContext<GlobalContextType>({
  isLoading: false,
  paginatorLoading:false,
  setLoadingState: () => {},
  setPaginatorLoadingState:() =>{}
});

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginatorLoading,setPaginatorLoading] = useState<boolean>(false);

  const setLoadingState = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  };
  const setPaginatorLoadingState = (loading:boolean) :void =>{
    setPaginatorLoading(loading)
  }
  return (
    <GlobalContext.Provider value={{ setLoadingState, isLoading,paginatorLoading,setPaginatorLoadingState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext };
