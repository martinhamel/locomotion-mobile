import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppContext } from "../AppContext";
import { Button, Card } from "react-native-paper";

export default  ({
  navigation,
}: {
  navigation: { navigate: (target: string) => void };
}) => {
  const { user } = useContext(AppContext) as AppContextType;

  return (
    <View style={styles.start}>
      <Text style={styles.welcome}>Bienvenue {user?.name},</Text>
      <Card style={styles.card}>
        <Card.Cover style={styles.cover}
          source={require("../assets/img-vehicules.png")}
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

      <Card style={[styles.card]}>
        <Card.Cover
          style={styles.cover}
          source={require("../assets/img-voiture2.png")}
        >
        </Card.Cover>
        <Card.Content>
          <Text style={styles.text}>
            Vous possédez un véhicule à partager ?
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Inscrivez-vous</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  start: {
    margin: 5,
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
  },
  card: {
    backgroundColor: "rgb(0, 173, 168)",
    margin: 5
  },
  cover: {
    backgroundColor: "rgb(0, 173, 168)",
  }
});

