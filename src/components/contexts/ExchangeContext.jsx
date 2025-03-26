import { createContext, useContext, useState } from "react";

const ExchangeContext = createContext();

export const ExchangeProvider = ({ children }) => {
  const [isExchangeAccepted, setIsExchangeAccepted] = useState(undefined); // 전역 상태

  return (
    <ExchangeContext.Provider value={{ isExchangeAccepted, setIsExchangeAccepted }}>
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => useContext(ExchangeContext);