import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";

const Current = () => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.current}>
      <Text>bonjour, {user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  current: {
    margin: 10,
  },
});

export default Current;
