import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Start from "./Start";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Drawer as paperDrawer } from "react-native-paper";
import { AppContext } from "../AppContext";
import "react-native-gesture-handler";
import Reserve from "./Reserve";

const Drawer = createDrawerNavigator();

export default () => {
  const { user, loadingUser, setTokens } = useContext(
    AppContext
  ) as AppContextType;

  const content = loadingUser ? (
    <ActivityIndicator style={styles.activity} color="#0000ff" />
  ) : (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <paperDrawer.Item
              label="Déconnexion"
              icon="logout"
              onPress={() => setTokens(null)}
            />
          </DrawerContentScrollView>
        )}
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Avatar.Image
              style={styles.avatar}
              source={{ uri: user?.avatar?.sizes?.thumbnail }}
              onTouchStart={() => navigation.toggleDrawer()}
              size={36}
            />
          ),
        })}
      >
        <Drawer.Screen
          name="Start"
          component={Start}
          options={{ title: "Locomotion" }}
        />
        <Drawer.Screen
          name="Reserve"
          component={Reserve}
          options={{ title: "Réservez" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );

  return content;
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
  activity: {
    height: "100%",
  },
});
