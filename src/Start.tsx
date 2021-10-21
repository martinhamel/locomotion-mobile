import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";

const Start = () => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.start}>
      <Text>bonjour, {user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  start: {
    margin: 10,
  },
});

export default Start;
