import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";
import { useFonts } from 'expo-font';


const Start = () => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.start}>
      <Text style={styles.welcome}>Bienvenue {user?.name},</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  start: {
    margin: 10,
  },
  welcome: {
    fontSize: 30,
    fontFamily: 'Brandon-regular'
  }
});

export default Start;
