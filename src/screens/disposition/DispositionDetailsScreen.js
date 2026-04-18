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
    }, []);

    if (!details) return null;

    const maskedAccount =
        "************" + details?.account_no?.slice(-4);

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }}></SafeAreaView>
            <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
                <AppHeader title={"Disposition Details"} />
                <ScrollView style={styles.container}>

                    {/* ACCOUNT CARD */}

                    <View style={styles.accountCard}>

                        <Text style={styles.accountText}>
                            A/C: {maskedAccount}
                        </Text>

                    </View>

                    {/* DETAILS CARD */}

                    <View style={styles.card}>

                        <DetailRow label="Visit Status" value={details.visit_status || "-"} />

                        <DetailRow label="Disposition" value={details.disposition || "-"} />

                        <DetailRow label="Amount" value={details.amount || "-"} />

                        <DetailRow label="Collection Type" value={details.collection_type || "-"} />

                        <DetailRow label="Cheque No" value={details.cheque_no || "-"} />

                        <DetailRow label="Bank Name" value={details.bank_name || "-"} />

                        <DetailRow label="Cheque Date" value={details.cheque_date || "-"} />

                        <DetailRow label="Receipt No" value={details.receipt_no || "-"} />

                        <DetailRow label="Transaction ID" value={details.transaction_id || "-"} />

                        <DetailRow label="Share Link" value={details.share_link || "-"} />

                        <DetailRow label="Remarks" value={details.remarks || "-"} />

                        <DetailRow label="Followup Date" value={details.followup_date || ""} />

                        <DetailRow label="Pincode" value={details.pincode || "-"} />

                        <DetailRow label="Created At" value={details.created_at || "-"} />

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
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

};


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#EFE7D5",
    },

    container: {
        flex: 1,
        padding: 16,
    },

    accountCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },

    accountText: {
        fontSize: 16,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#E6E0CF",
        padding: 14,
        borderRadius: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },

    label: {
        color: "#444",
    },

    value: {
        fontWeight: "600",
        maxWidth: "60%",
        textAlign: "right",
    },

});