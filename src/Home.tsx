import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Start from "./Start";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar } from "react-native-elements";
import { AppContext } from "../AppContext";
import "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const Home = () => {
  const { user, setTokens } = useContext(AppContext) as AppContextType;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <DrawerItem label="déconnexion" onPress={() => setTokens(null)} />
          </DrawerContentScrollView>
        )}
        screenOptions={({navigation}) => ({
          headerLeft: () => (
            <Avatar
              containerStyle={styles.avatar}
              rounded
              source={{ uri: user?.avatar?.sizes?.thumbnail }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      >
        <Drawer.Screen
          name="Home"
          component={Start}
          options={{ title: "Locomotion" }}
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
