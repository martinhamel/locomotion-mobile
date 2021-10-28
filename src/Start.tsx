import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";
import { Button, Card } from "react-native-paper";

const Start = ({
  navigation,
}: {
  navigation: { navigate: (target: string) => null };
}) => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.start}>
      <Text style={styles.welcome}>Bienvenue {user?.name},</Text>
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: "../assets/img-vehicules.png" }}
        ></Card.Cover>
        <Card.Content>
          <Text style={styles.text}>
            Vous avez accès à des vélos, des remorques de vélo et des voitures
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate("Reserve")}>
            {" "}
            Réservez{" "}
          </Button>
        </Card.Actions>
      </Card>

      {/* <Card style={[styles.card, {backgroundColor: '#1e4847'}]}>
        <Card.Cover
          style={[styles.cardAction]}
          source={{uri: require("../assets/img-voiture2.png")}}
        >
          <Text style={[styles.text, {backgroundColor: '#1e484747'}]}>
            Vous possédez un véhicule à partager ?
          </Text>

          <Button>Inscrivez-vous</Button>
        </Card.Cover>
      </Card> */}
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
    backgroundColor: "rgba(0, 173, 168, 0.77)",
  },
  card: {
    backgroundColor: "rgb(0, 173, 168)",
    padding: 0,
  },
});

export default Start;
