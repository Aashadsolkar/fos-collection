// src/components/dashboard/StatsGrid.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StatsGrid({ summary }) {
  const stats = [
    {
      label: "Untouched Data",
      value: summary.untouched_allocations,
    },
    {
      label: "Today's Disposition",
      value: summary.today_dispositions,
    },
    {
      label: "Overall Disposition",
      value: summary.overall_dispositions,
    },
    {
      label: "Total Disposition",
      value: summary.total_dispositions,
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((item, index) => (
        <LinearGradient
          key={index}
          colors={["#F9E79F", "#F4C400"]}
          style={styles.card}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </LinearGradient>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },
});