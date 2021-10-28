import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { Card, Button } from "react-native-paper";
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
        <View style={styles.login}>
          <Text>courriel</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text>mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button disabled={loading} onPress={() => login(email, password)}>
            connexion
          </Button>
        </View>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 12,
    padding: 5,
    width: 250,
  },
  login: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    backgroundColor: "rgba(256, 256, 256, 0.95)",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
