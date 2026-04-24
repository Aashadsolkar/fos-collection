import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../components/common/AppHeader";
import { getAllocationDetailsApi } from "../../api/allocationApi";

export default function AllocationDetailsScreen({ navigation, route }) {
  const { id } = route.params;

  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await getAllocationDetailsApi(id);
      setData(res.data.data.allocation);
      setHistory(res.data.data.dispositions || []);
    } catch (e) {
      console.log(e);
    }
  };

  const renderHistory = () => {
    if (history.length > 0) {
      return (
        <>
          <Text style={styles.historyTitle}>Previous History</Text>
          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <Text style={styles.historyTime}>🕒 {item.created_at}</Text>
              <Text style={styles.historyText}>
                Called customer — {item.visit_status}
              </Text>
            </View>
          ))}
        </>
      );
    }
  };

  if (!data) return null;

  const payload = data.payload;

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#F5F9F6" }} />
      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <AppHeader title="Allocation Detail" showBack={true} />
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

          {/* HEADER CARD */}
          <View style={styles.headerCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={styles.customerName}>{payload.NAME_OF_CUSTOMER}</Text>
                <Text style={styles.account}>
                  A/C: ************{data.account_no.slice(-4)}
                </Text>
              </View>
              <View style={styles.outstandingBadge}>
                <Text style={styles.outstandingLabel}>Outstanding</Text>
                <Text style={styles.outstandingValue}>
                  ₹{payload.LOAN_OUTSTANDING_AMOUNT}
                </Text>
              </View>
            </View>
          </View>

          {/* DETAILS CARD */}
          <View style={styles.card}>
            <DetailRow label="Branch" value={payload.BRANCH_NAME} />
            <DetailRow label="City" value={payload.PRESENT_ADD_CITY} />
            <DetailRow label="Product" value={payload.LOAN_PRODUCT_DESCRIPTION} />
            <DetailRow label="Sanctioned Amt" value={payload.LOAN_SANCTIONED_AMOUNT} />
            <DetailRow label="Disbursed Amt" value={payload.LOAN_DISBURSEMENT_AMOUNT} />

            {/* EMI Highlight */}
            <View style={styles.highlightRow}>
              <Text style={styles.highlightLabel}>EMI Amount</Text>
              <Text style={styles.highlightValue}>₹{payload.EMI_AMOUNT}</Text>
            </View>

            <DetailRow label="EMI Due Date" value={payload.NEXT_DUE_DATE} />
            <DetailRow label="IFSC Code" value={payload.IFSC_CODE} />
            <DetailRow label="Mobile" value={"******" + payload.MOBILE_NUMBER.slice(-4)} />
            <DetailRow label="Address" value={payload.PRESENT_ADD} />
            <DetailRow label="SMA Status" value={payload.SMA_STATUS} />
            <DetailRow label="Probable NPA Date" value={payload.PROBABLE_NPA_DATE} />
          </View>

          {/* HISTORY */}
          {renderHistory()}

          {/* FEEDBACK BUTTON */}
          <TouchableOpacity
            onPress={() => navigation.navigate("DispositionForm", { data })}
            style={styles.feedbackBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.feedbackText}>Give Feedback</Text>
            <Text style={styles.feedbackArrow}>→</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
    padding: 16,
  },

  // Header card
  headerCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
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
    fontWeight: "700",
    fontSize: 16,
    color: "#0A1F10",
    marginBottom: 4,
    letterSpacing: 0.2,
  },

  account: {
    color: "#6B9E7A",
    fontSize: 13,
    fontWeight: "500",
  },

  outstandingBadge: {
    backgroundColor: "#EDFAF3",
    borderWidth: 1,
    borderColor: "#C8E0D0",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  outstandingLabel: {
    fontSize: 11,
    color: "#6B9E7A",
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },

  outstandingValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22C55E",
    marginTop: 2,
  },

  // Details card
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF5EF",
  },

  rowLabel: {
    color: "#6B9E7A",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },

  rowValue: {
    fontWeight: "600",
    fontSize: 13,
    color: "#0A1F10",
    flex: 1,
    textAlign: "right",
  },

  // EMI highlight
  highlightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    backgroundColor: "#EDFAF3",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C8E0D0",
  },

  highlightLabel: {
    color: "#16A34A",
    fontWeight: "600",
    fontSize: 14,
  },

  highlightValue: {
    fontWeight: "700",
    fontSize: 15,
    color: "#22C55E",
  },

  // History
  historyTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "700",
    fontSize: 15,
    color: "#0A1F10",
    letterSpacing: 0.2,
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  historyTime: {
    fontSize: 12,
    color: "#6B9E7A",
    fontWeight: "500",
    marginBottom: 4,
  },

  historyText: {
    fontSize: 13,
    color: "#0A1F10",
    fontWeight: "500",
  },

  // Feedback button
  feedbackBtn: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  feedbackText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  feedbackArrow: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
  },
});
