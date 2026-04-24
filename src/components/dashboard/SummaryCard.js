// src/components/dashboard/SummaryCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SummaryCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B9E7A",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0A1F10",
    marginTop: 6,
    letterSpacing: -0.5,
  },
});
