import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NetworkContext } from "../context/NetworkContext";

export default function OfflineBanner() {
  const { isConnected } = useContext(NetworkContext);

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        No Internet Connection
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ff4d4f",
    padding: 8,
    zIndex: 1000,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});