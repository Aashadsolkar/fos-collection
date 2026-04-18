// src/components/dashboard/StatsGrid.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function StatsGrid({ summary, date }) {
  const navigation = useNavigation()
  const stats = [
    {
      label: "Untouched Data",
      value: summary.untouched_allocations,
      onPress: () => navigation.navigate("UnTouchedAllocation")
    },
    {
      label: `${date}'s Disposition`,
      value: summary.today_dispositions,
      onPress: () => navigation.navigate("Allocation")
    },
    {
      label: "Overall Disposition",
      value: summary.overall_dispositions,
      onPress: () => navigation.navigate("Disposition")
    },
    {
      label: "Total Disposition",
      value: summary.total_dispositions,
      onPress: () => navigation.navigate("Allocation")
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
          <TouchableOpacity onPress={item.onPress}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </TouchableOpacity>
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