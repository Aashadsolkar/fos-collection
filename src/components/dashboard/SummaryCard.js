// src/components/dashboard/SummaryCard.js

import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SummaryCard({ title, value }) {
  return (
    <LinearGradient
      colors={["#F9E79F", "#F4C400"]}
      style={styles.card}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  value: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 5,
  },
});