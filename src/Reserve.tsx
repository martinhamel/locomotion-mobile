import React from "react";
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

const getImage = (l: Loanable) => {
  if (l.type === "bike") return require("../assets/pins/bike-pin.png");
  else if (l.type === "car") return require("../assets/pins/car-pin.png");
  else return require("../assets/pins/trailer-pin.png");
};

export default () => {
  const {loanables, loading: loadingLoanables} = useLoanables();

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
          title={l.name}
        >
          <Image
            height={43}
            width={30}
            source={getImage(l)}
            resizeMode="contain"
          />
          <Callout>
            <View>
              <Text>{l.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))
    : null;
  return (
    <View style={styles.container}>
      {loading}
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
    zIndex: 99
  },
});