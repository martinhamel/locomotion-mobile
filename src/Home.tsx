import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Current from "./Current";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Icon, Avatar } from "react-native-elements";
import { AppContext } from "../App";
import "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const Home = () => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerLeft: (props) => (
            <Avatar
              containerStyle={styles.avatar}
              rounded
              source={{ uri: user?.avatar?.sizes?.thumbnail }}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Current}
          options={{ title: "Bienvenue!" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginLeft: 10,
  },
});

export default Home;
