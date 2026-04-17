import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AllocationCard({ item, onPress }) {
  const payload = item?.payload || {};

  const maskedAccount =
    "************" + item.account_no?.slice(-4);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>
          {payload.NAME_OF_CUSTOMER?.toUpperCase() || "N/A"}
        </Text>

        <Text style={styles.account}>
          A/C: {maskedAccount}
        </Text>

        <Text style={styles.outstanding}>
          Outstanding: {Number(
            payload.LOAN_OUTSTANDING_AMOUNT || 0
          ).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </Text>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={onPress}>
        <Text style={styles.viewText}>View Details</Text>
        {/* <Ionicons name="chevron-up" size={16} color="#000" /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  leftSection: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  account: {
    fontSize: 13,
    color: "#777",
    marginBottom: 6,
  },

  outstanding: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F4B400", // yellow
  },

  viewButton: {
    backgroundColor: "#F9D75D",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  viewText: {
    fontWeight: "600",
    marginRight: 4,
    color: "#000",
  },
});