import React, { useState, createContext } from "react";
import Login from "./src/Login";
import Home from "./src/Home";
import useUser from "./src/hooks/useUser";
import { ToastProvider } from "react-native-toast-notifications";
import useTokens from "./src/hooks/useTokens";
import { AppContext } from "./AppContext";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

const App = () => {
  const [tokens, setTokens, loadingToken] = useTokens();
  const [user, loadingUser] = useUser(tokens, setTokens);
  const [fontsLoaded] = useFonts({
    "Brandon-regular": require("./assets/fonts/BrandonText-Regular.otf"),
    "Brandon-bold": require("./assets/fonts/BrandonText-Bold.otf"),
  });

  const screen = tokens ? <Home /> : <Login />;
  const content = loadingToken ? (
    <ActivityIndicator color="#0000ff" style={styles.activity} />
  ) : (
    screen
  );

  return (
    <ToastProvider>
      <AppContext.Provider value={{ tokens, setTokens, user, loadingUser }}>
        {content}
      </AppContext.Provider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  activity: {
    height: "100%",
  },
});

export default App;
