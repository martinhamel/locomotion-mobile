import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../App";

const Current = () => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View>
      <Text>bonjour, {user?.name}</Text>
    </View>
  );
};

export default Current;
