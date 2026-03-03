import React, { useContext } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ErrorContext } from "../context/ErrorContext";

const GlobalSnackbar = () => {
  const { error } = useContext(ErrorContext);

  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

export default GlobalSnackbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#ff4d4f",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});