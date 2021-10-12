import { Button, TextInput, StyleSheet, Text, View } from "react-native";
import React, { useState, Dispatch, SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { AppContext } from "../App";
import { StatusBar } from "expo-status-bar";
import useLogin from "./hooks/useLogin";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin(navigation);

  return (
    <View style={styles.login}>
      <Text>courriel</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text>mot de passe</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="connexion" onPress={() => login(email, password)} />
      <StatusBar style="auto" />
    </View>
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
    backgroundColor: "#fff",
  },
});

export default Login;
