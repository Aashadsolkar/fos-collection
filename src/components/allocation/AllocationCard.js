// components/AllocationCard.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function AllocationCard({ item, onPress }) {
  const payload = item?.payload || {};

  const maskedAccount = "************" + item.account_no?.slice(-4);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>
          {payload.NAME_OF_CUSTOMER?.toUpperCase() || "N/A"}
        </Text>

        <Text style={styles.account}>A/C: {maskedAccount}</Text>

        <Text style={styles.outstanding}>
          ₹{" "}
          {Number(payload.LOAN_OUTSTANDING_AMOUNT || 0).toLocaleString(
            "en-IN",
            { minimumFractionDigits: 2 }
          )}
        </Text>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={onPress} activeOpacity={0.75}>
        <Text style={styles.viewText}>View Details</Text>
        <Ionicons name="arrow-forward" size={12} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  leftSection: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0A1F10",
    marginBottom: 4,
    letterSpacing: 0.2,
  },

  account: {
    fontSize: 12,
    color: "#6B9E7A",
    marginBottom: 6,
    fontWeight: "500",
  },

  outstanding: {
    fontSize: 14,
    fontWeight: "700",
    color: "#22C55E",
    letterSpacing: 0.2,
  },

  viewButton: {
    backgroundColor: "#EDFAF3",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C8E0D0",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  viewText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#16A34A",
  },

  viewArrow: {
    fontSize: 13,
    color: "#22C55E",
    fontWeight: "700",
  },
});
