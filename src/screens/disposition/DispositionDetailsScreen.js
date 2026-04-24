import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispositionDetails } from "../../context/DispositionDetailsContext";
import AppHeader from "../../components/common/AppHeader";

export default function DispositionDetailsScreen({ route }) {

    const { id } = route.params;
    const { details, fetchDispositionDetails } = useDispositionDetails();

    useEffect(() => {
        fetchDispositionDetails(id);
    }, [id]);

    if (!details) return null;

    const maskedAccount = "************" + details?.account_no?.slice(-4);

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "#F5F9F6" }} />
            <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
                <AppHeader title="Disposition Details" />
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

                    {/* ACCOUNT CARD */}
                    <View style={styles.accountCard}>
                        <Text style={styles.accountLabel}>Account Number</Text>
                        <Text style={styles.accountText}>{maskedAccount}</Text>
                    </View>

                    {/* DETAILS CARD */}
                    <View style={styles.card}>
                        <DetailRow label="Visit Status"     value={details.visit_status || "-"} />
                        <DetailRow label="Disposition"      value={details.disposition || "-"} />
                        <DetailRow label="Amount"           value={details.amount || "-"} />
                        <DetailRow label="Collection Type"  value={details.collection_type || "-"} />
                        <DetailRow label="Cheque No"        value={details.cheque_no || "-"} />
                        <DetailRow label="Bank Name"        value={details.bank_name || "-"} />
                        <DetailRow label="Cheque Date"      value={details.cheque_date || "-"} />
                        <DetailRow label="Receipt No"       value={details.receipt_no || "-"} />
                        <DetailRow label="Transaction ID"   value={details.transaction_id || "-"} />
                        <DetailRow label="Share Link"       value={details.share_link || "-"} />
                        <DetailRow label="Remarks"          value={details.remarks || "-"} />
                        <DetailRow label="Followup Date"    value={details.followup_date || ""} />
                        <DetailRow label="Pincode"          value={details.pincode || "-"} />
                        <DetailRow label="Created At"       value={details.created_at || "-"} />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const DetailRow = ({ label, value }) => {
    if (!value) return null;

    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#F5F9F6",
    },

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F5F9F6",
    },

    // Account card
    accountCard: {
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

    accountLabel: {
        fontSize: 11,
        color: "#6B9E7A",
        fontWeight: "600",
        letterSpacing: 0.5,
        textTransform: "uppercase",
        marginBottom: 4,
    },

    accountText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0A1F10",
        letterSpacing: 0.5,
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
        paddingVertical: 9,
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
        maxWidth: "60%",
        textAlign: "right",
    },

});
