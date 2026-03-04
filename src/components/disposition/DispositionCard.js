import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DispositionCard({ item }) {
  const masked = "************" + item.account_no?.slice(-4);

  const getStatusStyle = () => {
    switch (item.disposition?.toLowerCase()) {
      case "fully paid":
        return styles.green;
      case "partially paid":
        return styles.gray;
      default:
        return styles.gray;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.name}>Customer Name</Text>

        <Text style={styles.outstanding}>
          Outstanding EMI: ₹{item.amount}
        </Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.account}>{masked}</Text>
        <Ionicons name="chevron-down" size={18} />
      </View>

      <View style={styles.badgeContainer}>
        <Text style={[styles.badge, getStatusStyle()]}>
          {item.disposition}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  outstanding: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F4B400",
  },
  account: {
    marginTop: 6,
    color: "#777",
  },
  badgeContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  green: {
    backgroundColor: "#D4F8E8",
    color: "#1B8F5A",
  },
  gray: {
    backgroundColor: "#E0E0E0",
    color: "#555",
  },
});