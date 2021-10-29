import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  NativeModules,
  LayoutAnimation,
} from "react-native";
import { Card, ToggleButton } from "react-native-paper";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default ({
  loanableType,
  setLoanableType,
}: {
  loanableType: LoanableType | null;
  setLoanableType: (loanableType: LoanableType) => void;
}) => {
  const buttons = (
    <View
      style={
        loanableType
          ? styles.loanableTypeButtonsAlone
          : styles.loanableTypeButtonsCard
      }
    >
      <ToggleButton
        icon="bike"
        status={loanableType === "bike" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("bike");
        }}
      />
      <ToggleButton
        icon="car"
        status={loanableType === "car" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("car");
        }}
      />
      <ToggleButton
        icon="truck-trailer"
        status={loanableType === "trailer" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("trailer");
        }}
      />
    </View>
  );

  if (loanableType) {
    return (
      <Card style={styles.cardSmall}>
        <Card.Actions>{buttons}</Card.Actions>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Title title="Vous voulez" />
      <Card.Content>
        <Text>Vélo, automobile ou remorque ?</Text>
      </Card.Content>
      <Card.Actions>{buttons}</Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  loanableTypeButtonsAlone: {
    display: "flex",
    flexDirection: "column",
  },
  loanableTypeButtonsCard: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    position: "absolute",
    zIndex: 20,
  },
  cardSmall: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 20,
  },
});
