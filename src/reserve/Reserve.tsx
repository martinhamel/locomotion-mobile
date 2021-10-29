import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import useLoanables from "../hooks/useLoanables";
import MapView, { Callout, LocalTile, Marker } from "react-native-maps";
import { Avatar, ToggleButton, Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatRelative, formatDistance, format, add } from "date-fns";
import { fr } from "date-fns/locale";
import ChooseLoanable from "./ChooseLoanable";

const getImage = (type: LoanableType) => {
  if (type === "bike") return require("../../assets/pins/bike-pin.png");
  else if (type === "car") return require("../../assets/pins/car-pin.png");
  else return require("../../assets/pins/trailer-pin.png");
};

export default () => {
  const [loanableType, setLoanableType] = useState<LoanableType | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [durationInMinutes, setDuration] = useState<number | null>(null);
  const { loanables, loading: loadingLoanables } = useLoanables(
    loanableType,
    startTime,
    durationInMinutes
  );

  const formatedStartDate = format(startTime ?? new Date(), "d MMM à H:m", {
    locale: fr,
  });
  const formatedDuration = formatDistance(
    startTime ?? new Date(),
    add(startTime ?? new Date(), { minutes: durationInMinutes ?? 60 }),
    { locale: fr }
  );

  const loading = loadingLoanables ? (
    <ActivityIndicator style={styles.activity} color="#0000ff" />
  ) : null;

  const markers = loanables
    ? loanables.map((l) => (
        <Marker
          coordinate={{
            latitude: l.position_google.lat,
            longitude: l.position_google.lng,
          }}
          key={l.id}
          image={getImage(l.type)}
        >
          <Callout>
            <View style={styles.callout}>
              <Avatar.Image
                source={{ uri: l?.image?.sizes.thumbnail }}
                size={36}
              />
              <Text>{l?.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))
    : null;
  return (
    <View style={styles.container}>
      {loading}
      <ChooseLoanable
        loanableType={loanableType}
        setLoanableType={setLoanableType}
      />

      <Card style={styles.timeCard}>
        <Card.Content>
          <Text>véhicules disponibles</Text>
          <Text>le: {formatedStartDate}</Text>
          <Text>pendant {formatedDuration}</Text>
        </Card.Content>
      </Card>
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.5359968,
          longitude: -73.6013709,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        mapType={"terrain"}
      >
        {markers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  activity: {
    height: "100%",
    position: "absolute",
    zIndex: 99,
  },
  callout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  timeCard: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
  },
});
