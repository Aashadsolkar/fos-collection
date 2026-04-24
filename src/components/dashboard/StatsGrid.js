// src/components/dashboard/StatsGrid.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function StatsGrid({ summary, date }) {
  const navigation = useNavigation();

  const stats = [
    {
      label: "Untouched Data",
      value: summary.untouched_allocations,
      onPress: () => navigation.navigate("UnTouchedAllocation"),
    },
    {
      label: `${date}'s Disposition`,
      value: summary.today_dispositions,
      onPress: () => navigation.navigate("Disposition"),
    },
    {
      label: "Overall Disposition",
      value: summary.overall_dispositions,
      onPress: () => navigation.navigate("Disposition"),
    },
    {
      label: "Total Disposition",
      value: summary.total_dispositions,
      onPress: () => navigation.navigate("Disposition"),
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={item.onPress}
          activeOpacity={0.75}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={12} color="#000" />
          </View>
        </TouchableOpacity>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B9E7A",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
    color: "#0A1F10",
    letterSpacing: -0.5,
  },
  arrow: {
    marginTop: 10,
    alignSelf: "flex-end",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EDFAF3",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 13,
    color: "#22C55E",
    fontWeight: "700",
  },
});
