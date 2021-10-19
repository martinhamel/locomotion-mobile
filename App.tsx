import React, { useState, createContext } from "react";
import Login from "./src/Login";
import Home from "./src/Home";
import useUser from "./src/hooks/useUser";
import { ToastProvider } from "react-native-toast-notifications";
import useTokens from "./src/hooks/useTokens";

export const AppContext = createContext<AppContextType | null>(null);

const App = () => {
  const [tokens, setTokens] = useTokens();
  const user = useUser(tokens);
  const screen = tokens ? <Home /> : <Login />;

  return (
    <ToastProvider>
      <AppContext.Provider value={{ tokens, setTokens, user }}>
        {screen}
      </AppContext.Provider>
    </ToastProvider>
  );
};

export default App;
