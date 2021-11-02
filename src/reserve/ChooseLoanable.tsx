import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  LayoutAnimation,
} from "react-native";
import { Card, Dialog, ToggleButton } from "react-native-paper";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default ({
  loanableType,
  setLoanableType,
  flowState,
  setFlowState,
}: {
  loanableType: LoanableType | null;
  setLoanableType: (loanableType: LoanableType) => void;
  flowState: ReserveFlowState;
  setFlowState: (state: ReserveFlowState) => void;
}) => {
  const buttons = (
    <View
      style={
        flowState === "1-setLoanableType"
          ? styles.loanableTypeButtonsCard
          : styles.loanableTypeButtonsAlone
      }
    >
      <ToggleButton
        icon="bike"
        status={loanableType === "bike" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("bike");
          if (flowState === "1-setLoanableType") setFlowState("2-setStartDate");
        }}
      />
      <ToggleButton
        icon="car"
        status={loanableType === "car" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("car");
          if (flowState === "1-setLoanableType") setFlowState("2-setStartDate");
        }}
      />
      <ToggleButton
        icon="truck-trailer"
        status={loanableType === "trailer" ? "checked" : "unchecked"}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setLoanableType("trailer");
          if (flowState === "1-setLoanableType") setFlowState("2-setStartDate");
        }}
      />
    </View>
  );

  if (flowState === "1-setLoanableType") {
    return (
      <Dialog visible={true}>
        <Dialog.Title>Vous voulez</Dialog.Title>
        <Dialog.Content>
          <Text>Vélo, automobile ou remorque ?</Text>
        </Dialog.Content>
        <Dialog.Actions>{buttons}</Dialog.Actions>
      </Dialog>
    );
  }
  return (
    <Card style={styles.cardSmall}>
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
  cardSmall: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 20,
  },
});
