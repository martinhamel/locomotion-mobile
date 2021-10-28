import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import useLoanables from "./hooks/useLoanables";
import MapView, { Callout, Marker } from "react-native-maps";
import { Avatar, ToggleButton } from "react-native-paper";

const getImage = (type: LoanableType) => {
  if (type === "bike") return require("../assets/pins/bike-pin.png");
  else if (type === "car") return require("../assets/pins/car-pin.png");
  else return require("../assets/pins/trailer-pin.png");
};

export default () => {
  const [loanableType, setLoanableType] = useState<LoanableType>("bike");
  const { loanables, loading: loadingLoanables } = useLoanables(loanableType);

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
      <View style={styles.loanableTypeButtons}>
        <ToggleButton
          icon="bike"
          status={loanableType === 'bike' ? 'checked': 'unchecked'}
          onPress={() => setLoanableType("bike")}
        />
        <ToggleButton
          icon="car"
          status={loanableType === 'car' ? 'checked': 'unchecked'}
          onPress={() => setLoanableType("car")}
        />
        <ToggleButton
          icon="truck-trailer"
          status={loanableType === 'trailer' ? 'checked': 'unchecked'}
          onPress={() => setLoanableType("trailer")}
        />
      </View>
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
  loanableTypeButtons: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
    backgroundColor: '#ddd8'
  },
});
