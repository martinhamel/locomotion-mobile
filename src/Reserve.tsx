import React from "react";
import { View, Text } from "react-native";
import useLoanables from "./hooks/useLoanables";

const Reserve = () => {
  const loanables = useLoanables();
  return (
    <View>
      <Text>Réservation</Text>
    </View>
  );
};

export default Reserve;
