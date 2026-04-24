import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function DispositionCard({ item, onPress }) {
  const masked = "************" + item.account_no?.slice(-4);

  const getStatusStyle = () => {
    switch (item.disposition?.toLowerCase()) {
      case "fully paid":
        return styles.statusGreen;
      case "partially paid":
        return styles.statusAmber;
      default:
        return styles.statusGray;
    }
  };

  return (
    <View style={styles.card}>

      {/* Customer Name */}
      <Text style={styles.customerName}>
        {item.name?.toUpperCase() || "N/A"}
      </Text>

      {/* Outstanding + Status badge */}
      <View style={styles.rowBetween}>
        <Text style={styles.outstanding}>₹{item.amount}</Text>
        <Text style={[styles.badge, getStatusStyle()]}>{item.disposition}</Text>
      </View>

      {/* Outstanding label */}
      <Text style={styles.outstandingLabel}>Outstanding EMI</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Account + View Details */}
      <View style={styles.rowBetween}>
        <Text style={styles.account}>{masked}</Text>
        <TouchableOpacity onPress={onPress} style={styles.viewButton} activeOpacity={0.75}>
          <Text style={styles.viewText}>View Details</Text>
          <Ionicons name="arrow-forward" size={12} color="#000" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  customerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: 0.3,
    marginBottom: 10,
  },

  outstanding: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: -0.5,
  },

  outstandingLabel: {
    fontSize: 11,
    color: "#6B9E7A",
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginTop: 2,
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF5EF",
    marginBottom: 12,
  },

  account: {
    color: "#6B9E7A",
    fontSize: 13,
    fontWeight: "500",
  },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
    overflow: "hidden",
  },

  statusGreen: {
    backgroundColor: "#EDFAF3",
    color: "#16A34A",
  },

  statusAmber: {
    backgroundColor: "#FEF9EC",
    color: "#B45309",
  },

  statusGray: {
    backgroundColor: "#F3F4F6",
    color: "#6B7280",
  },

  viewButton: {
    backgroundColor: "#EDFAF3",
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 10,
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
