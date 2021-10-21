import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";
import { Button, Card } from "react-native-elements";

const Start = ({navigation}) => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.start}>
      <Text style={styles.welcome}>Bienvenue {user?.name},</Text>
      <Card containerStyle={styles.card}>
        <Card.Image
          style={styles.cardAction}
          source={require("../assets/img-vehicules.png")}
        >
          <Text style={styles.text}>
            Vous avez accès à des vélos, des remorques de vélo et des voitures
          </Text>

          <Button title="Réservez" onPress={() => navigation.navigate('Reserve')}/>
        </Card.Image>
      </Card>

      <Card containerStyle={[styles.card, {backgroundColor: '#1e4847'}]}>
        <Card.Image
          style={[styles.cardAction]}
          source={require("../assets/img-voiture2.png")}
        >
          <Text style={[styles.text, {backgroundColor: '#1e484747'}]}>
            Vous possédez un véhicule à partager ?
          </Text>

          <Button title="Inscrivez-vous" />
        </Card.Image>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  start: {
    margin: 10,
    flex: 1,
  },
  welcome: {
    fontSize: 30,
    fontFamily: "Brandon-regular",
  },
  text: {
    fontFamily: "Brandon-bold",
    fontSize: 16,
    color: "#fff",
    backgroundColor: 'rgba(0, 173, 168, 0.77)'
  },
  card: {
    backgroundColor: "rgb(0, 173, 168)",
    padding: 0,
  },
  cardAction: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default Start;
