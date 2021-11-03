import React, { useState } from "react";
import { Button, Card, Dialog, Portal, Text } from "react-native-paper";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { format, set, startOfISOWeek } from "date-fns";
import { fr } from "date-fns/locale";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import NumberPlease from "react-native-number-please";


export default ({
  startTime,
  setStartTime,
  flowState,
  setFlowState,
}: {
  startTime: Date;
  setStartTime: (date: Date) => void;
  flowState: ReserveFlowState;
  setFlowState: (state: ReserveFlowState) => void;
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [localTime, setLocalTime] = useState(startTime);
  const [localHours, setLocalHours] = useState(startTime.getHours())
  const [localMinutes, setLocalMinutes] = useState(startTime.getMinutes())

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
  console.log(flowState, format(startTime, "yyyy-MM-dd"), startTime);

  const datePicker =
    flowState === "2-setStartTime" || showDatePicker ? (
      <Portal>
        <Dialog visible={true}>
          <Dialog.Title>Quand partez-vous ?</Dialog.Title>
          <Dialog.Content>
            <Calendar
              markingType={"custom"}
              markedDates={{
                [format(localTime, "yyyy-MM-dd")]: {
                  customStyles: {
                    container: {
                      backgroundColor: "#3f98eb",
                    },
                    text: {
                      color: "black",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
              onDayPress={(day) => {
                setLocalTime(
                  set(localTime, {
                    date: day.day,
                    month: day.month - 1,
                    year: day.year,
                  })
                );
              }}
            />
            <View style={styles.time}>
              <NumberPlease digits={[{id: 'hour', min:0,max:23}]}  values={[{id: 'hour', value: localHours}]} onChange={values => setLocalHours(values.value)}/>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    ) : null;

  return (
    <View>
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
        </Card.Actions>
      </Card>
      {datePicker}
    </View>
  );
};

const styles = StyleSheet.create({
  timeCardSmall: {},
  buttons: {
    margin: 5,
    zIndex: 1000,
  },
  time:{
    flex: 1
  }
});
