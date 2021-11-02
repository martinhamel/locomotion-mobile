import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import useLogin from "./hooks/useLogin";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  return (
    <ImageBackground
      source={require("../assets/tandem.png")}
      style={styles.image}
    >
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label='courriel'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label='mot de passe'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </Card.Content>
        <Card.Actions>
          <Button disabled={loading} onPress={() => login(email, password)}>
            connexion
          </Button>
        </Card.Actions>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(256, 256, 256, 0.95)",
    width: '90%',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: "100%",
  },
});
