import React, { useState, createContext } from "react";
import Login from "./src/Login";
import Home from "./src/Home";
import useUser from "./src/hooks/useUser";
import { ToastProvider } from "react-native-toast-notifications";
import useTokens from "./src/hooks/useTokens";
import { AppContext } from "./AppContext";
import { ActivityIndicator } from "react-native";

const App = () => {
  const [tokens, setTokens, loadingToken] = useTokens();
  const [user, loadingUser] = useUser(tokens);
  const screen = tokens ? <Home /> : <Login />;
  const content = loadingToken ? <ActivityIndicator /> : screen;

  return (
    <ToastProvider>
      <AppContext.Provider value={{ tokens, setTokens, user, loadingUser }}>
        {content}
      </AppContext.Provider>
    </ToastProvider>
  );
};

export default App;
