import React, { useState } from "react";
import {
  Button,
  Card,
  Dialog,
  Portal,
  RadioButton,
  Text,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
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
  const [time, setTime] = useState(durationInMinutes);
  const [timeUnit, setTimeUnit] = useState<"minutes" | "hours" | "days">(
    "minutes"
  );

  return showDuration ? (
    <Portal>
      <Dialog visible={true} style={styles.timeCardBig}>
        <Dialog.Title>Durée</Dialog.Title>
        <Dialog.Content>
          <Text>Pendant combien de temps partez-vous ?</Text>
          <TextInput
            style={styles.input}
            value={`${time}`}
            onChangeText={(text) => {
              const newTime = text === "" ? 0 : parseInt(text);
              if (Number.isNaN(newTime)) {
                setTime(time);
              } else {
                setTime(newTime);
              }
            }}
            keyboardType="number-pad"
            autoFocus={true}
          />
          <View>
            <View style={styles.radio}>
              <RadioButton
                value="minutes"
                status={"minutes" === timeUnit ? "checked" : "unchecked"}
                onPress={() => setTimeUnit("minutes")}
              />
              <Text>minutes</Text>
            </View>
            <View style={styles.radio}>
              <RadioButton
                value="hours"
                status={"hours" === timeUnit ? "checked" : "unchecked"}
                onPress={() => setTimeUnit("hours")}
              />
              <Text>heures</Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowDuration(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
    zIndex: 10,
  },
  buttons: {
    margin: 5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 100,
  },
  radio: {
    flex: 1,
    flexDirection: "row",
  },
});
