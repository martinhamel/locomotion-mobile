import React, { useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DateTimePicker from "@react-native-community/datetimepicker";

export default ({
  startTime,
  setStartTime,
  flowState,
  setFlowState,
}: {
  startTime: Date | undefined;
  setStartTime: (date: Date | undefined) => void;
  flowState: ReserveFlowState;
  setFlowState: (state: ReserveFlowState) => void;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatedStartDate = startTime
    ? format(startTime, "d MMMM", {
        locale: fr,
      })
    : "date";
  const formatedStartTime = startTime
    ? format(startTime, "H:mm", {
        locale: fr,
      })
    : "heure";

  const datePicker =
    flowState === "2-setStartDate" || showDatePicker ? (
      <DateTimePicker
        value={startTime || new Date()}
        mode="date"
        onChange={(_e: any, date: Date | undefined) => {
          if (date) {
            setStartTime(date);
            setShowDatePicker(false);
            if (flowState === "2-setStartDate") setFlowState("3-setStartTime");
          }
        }}
      />
    ) : null;

  const timePicker =
    flowState === "3-setStartTime" || showTimePicker ? (
      <DateTimePicker
        value={startTime || new Date()}
        mode="time"
        is24Hour={true}
        onChange={(_e: any, date: Date | undefined) => {
          if (date) {
            setStartTime(date);
            setShowTimePicker(false);
            if (flowState === "3-setStartTime") setFlowState("4-setDuration");
          }
        }}
      />
    ) : null;

  return (
    <Card style={styles.timeCardSmall}>
      <Card.Actions>
        <Button
          mode="contained"
          color="#bbb"
          style={styles.buttons}
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
          {formatedStartDate}
        </Button>
        <Button
          mode="contained"
          color="#bbb"
          style={styles.buttons}
          onPress={() => setShowTimePicker(true)}
        >
          {formatedStartTime}
        </Button>
      </Card.Actions>
      {datePicker}
      {timePicker}
    </Card>
  );
};

const styles = StyleSheet.create({
  timeCardSmall: {},
  buttons: {
    margin: 5,
    zIndex: 1000,
  },
});
