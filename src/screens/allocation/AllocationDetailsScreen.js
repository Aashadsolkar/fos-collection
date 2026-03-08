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

  const [data, setData] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    try {

      const res = await getAllocationDetailsApi(id)

      setData(res.data.data.allocation)
      setHistory(res.data.data.dispositions || [])

    } catch (e) {
      console.log(e)
    }
  }

  if (!data) return null

  const payload = data.payload

  const maskedAccount =
    "************" + data.account_no.slice(-4)

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }}></SafeAreaView>
      <SafeAreaView edges={[]} style={styles.safeArea}>
        <AppHeader title={"Allocation Detail"} showBack={true} />
        <ScrollView style={styles.container}>

          {/* HEADER */}

          <View style={styles.headerCard}>

            <View style={styles.rowBetween}>
              <Text style={styles.customerName}>
                {payload.NAME_OF_CUSTOMER}
              </Text>

              {/* <TouchableOpacity style={styles.hideBtn}>
            <Text>Hide ▲</Text>
          </TouchableOpacity> */}
              <View>
                <Text style={styles.account}>
                  A/C: ************{data.account_no.slice(-4)}
                </Text>

                <Text style={styles.outstanding}>
                  Outstanding: ₹{payload.LOAN_OUTSTANDING_AMOUNT}
                </Text>
              </View>
            </View>



          </View>


          {/* DETAILS CARD */}

          <View style={styles.card}>

            <DetailRow label="Branch" value={payload.BRANCH_NAME} />

            <DetailRow label="City" value={payload.PRESENT_ADD_CITY} />

            <DetailRow label="Product" value={payload.LOAN_PRODUCT_DESCRIPTION} />

            <DetailRow
              label="Sanctioned Amt"
              value={payload.LOAN_SANCTIONED_AMOUNT}
            />

            <DetailRow
              label="Disbursed Amt"
              value={payload.LOAN_DISBURSEMENT_AMOUNT}
            />


            {/* EMI Highlight */}

            <View style={styles.highlightRow}>
              <Text style={styles.label}>EMI Amount</Text>
              <Text style={styles.value}>₹{payload.EMI_AMOUNT}</Text>
            </View>

            <DetailRow
              label="EMI Due Date"
              value={payload.NEXT_DUE_DATE}
            />

            <DetailRow label="IFSC Code" value={payload.IFSC_CODE} />

            <DetailRow
              label="Mobile"
              value={"******" + payload.MOBILE_NUMBER.slice(-4)}
            />

            <DetailRow
              label="Address"
              value={payload.PRESENT_ADD}
            />

            <DetailRow
              label="SMA Status"
              value={payload.SMA_STATUS}
            />

            <DetailRow
              label="Probable NPA Date"
              value={payload.PROBABLE_NPA_DATE}
            />

          </View>


          {/* HISTORY */}

          <Text style={styles.historyTitle}>Previous History</Text>

          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>

              <Text style={styles.historyText}>
                🕒 {item.created_at}
              </Text>

              <Text style={styles.historyText}>
                Called customer - {item.visit_status}
              </Text>

            </View>
          ))}


          {/* BUTTON */}

          <TouchableOpacity onPress={() => navigation.navigate("DispositionForm", { data : data})} style={styles.feedbackBtn}>
            <Text style={styles.feedbackText}>
              💬 Give Feedback
            </Text>
          </TouchableOpacity>


        </ScrollView>
      </SafeAreaView>
    </>

  );
}

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFE7D5"
  },

  container: {
    flex: 1,
    backgroundColor: "#EFE7D5",
    padding: 16
  },

  headerCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  customerName: {
    fontWeight: "700",
    fontSize: 16
  },

  account: {
    color: "#777",
    marginTop: 4
  },

  outstanding: {
    marginTop: 6,
    color: "#F4B400",
    fontWeight: "700"
  },

  hideBtn: {
    backgroundColor: "#F4D35E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },

  card: {
    backgroundColor: "#E6E0CF",
    padding: 14,
    borderRadius: 12
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6
  },

  label: {
    color: "#444"
  },

  value: {
    fontWeight: "600"
  },

  highlightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#F2E3A2",
    padding: 8,
    borderRadius: 6
  },

  historyTitle: {
    marginTop: 18,
    fontWeight: "700"
  },

  historyCard: {
    backgroundColor: "#F2E3A2",
    padding: 12,
    borderRadius: 10,
    marginTop: 8
  },

  historyText: {
    fontSize: 13
  },

  feedbackBtn: {
    backgroundColor: "#F4B400",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center"
  },

  feedbackText: {
    fontWeight: "700"
  }

})