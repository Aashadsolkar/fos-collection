import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function AppInitLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F3C300" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});