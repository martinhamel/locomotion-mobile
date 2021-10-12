import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Locomotion !</Text>
        <Text style={{ fontSize: 8 }}>par Martin</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
