import React, { useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { formatDistance, add } from "date-fns";
import { fr } from "date-fns/locale";

export default ({
  durationInMinutes,
  startTime,
  flowState,
  setFlowState,
}: {
  durationInMinutes: number;
  startTime: Date | undefined;
  flowState: ReserveFlowState;
  setFlowState: (state: ReserveFlowState) => void;
}) => {
  const [showDuration, setShowDuration] = useState(false);

  return showDuration ? (
    <Card style={styles.timeCardBig}>
      <Card.Title title="Durée" />
      <Card.Content>
        <Text>Pendant combien de temps partez-vous ?</Text>
      </Card.Content>
      {/* <Card.Actions></Card.Actions> */}
    </Card>
  ) : (
    <Card style={styles.timeCardSmall}>
      <Card.Actions>
        <Button
          mode="contained"
          color="#bbb"
          style={styles.buttons}
          onPress={() => setShowDuration(true)}
        >
          {formatDistance(
            startTime || new Date(),
            add(startTime || 60, { minutes: durationInMinutes }),
            { locale: fr }
          )}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  timeCardSmall: {},
  timeCardBig: {
    position: "absolute",
    zIndex: 10,
  },
  buttons: {
    margin: 5,
  },
});
