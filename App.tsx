import React, { useState, createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/Login";
import Home from "./src/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useUser from "./src/hooks/useUser";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();
export const AppContext = createContext<AppContextType | null>(null);

const App = () => {
  const [tokens, setTokens] = useState<Tokens>();
  const user = useUser(tokens);

  return (
    <ToastProvider>
        <AppContext.Provider value={{ tokens, setTokens }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Connexion" }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: "Locomotion" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
    </ToastProvider>
  );
};


export default App;
