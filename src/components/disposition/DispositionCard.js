import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DispositionCard({ item, onPress }) {
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
        <Text style={[styles.badge, getStatusStyle()]}>
          {item.disposition}
        </Text>
      </View>

      <View style={styles.badgeContainer}>
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: "#F9D75D", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50 }}><Text style={{ fontWeight: 600 }}>View Details</Text></TouchableOpacity>
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
    marginTop: 15,
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