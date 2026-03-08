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
          style={[
            styles.tab,
            period === tab.value && styles.activeTab,
          ]}
          onPress={() => setPeriod(tab.value)}
        >
          <Text
            style={[
              styles.tabText,
              period === tab.value && styles.activeText,
            ]}
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
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 6,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#F9D75D",
  },
  tabText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "600",
  },
  activeText: {
    color: "#000",
  },
});