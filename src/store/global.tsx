import React, { useState, createContext } from "react";
import { GlobalContextType, GlobalProviderProps } from "../types/global";

const GlobalContext = createContext<GlobalContextType>({
  isLoading: false,
  setLoadingState: () => {},
});

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoadingState = (isLoading: boolean): void => {
    setIsLoading(isLoading);
  };

  return (
    <GlobalContext.Provider value={{ setLoadingState, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export { GlobalContext };
