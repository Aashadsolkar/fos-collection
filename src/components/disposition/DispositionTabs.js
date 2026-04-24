import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DispositionTabs({ period, setPeriod }) {
  const tabs = [
    { label: "All", value: "all" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          style={[styles.tab, period === tab.value && styles.activeTab]}
          onPress={() => setPeriod(tab.value)}
          activeOpacity={0.75}
        >
          <Text
            style={[styles.tabText, period === tab.value && styles.activeText]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 5,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#22C55E",
  },
  tabText: {
    fontSize: 13,
    color: "#6B9E7A",
    fontWeight: "600",
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
