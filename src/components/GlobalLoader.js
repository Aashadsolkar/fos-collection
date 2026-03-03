import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { LoaderContext } from "../context/LoaderContext";

export default function GlobalLoader() {
  const { loading } = useContext(LoaderContext);

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});