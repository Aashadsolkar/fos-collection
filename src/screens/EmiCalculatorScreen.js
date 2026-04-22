import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/common/AppHeader";

export default function EmiCalculatorScreen() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(tenure) * 12;

    if (!P || !R || !N) {
      setEmi(null);
      return;
    }

    const emiValue =
      (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setEmi(emiValue.toFixed(2));
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <AppHeader title={"EMI Calculator"} />

        <View style={styles.container}>
          <Text style={styles.label}>Loan Amount (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
          />

          <Text style={styles.label}>Interest Rate (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={rate}
            onChangeText={setRate}
            placeholder="Enter rate"
          />

          <Text style={styles.label}>Tenure (Years)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tenure}
            onChangeText={setTenure}
            placeholder="Enter years"
          />

          <TouchableOpacity style={styles.button} onPress={calculateEMI}>
            <Text style={styles.buttonText}>Calculate EMI</Text>
          </TouchableOpacity>

          {emi && (
            <View style={styles.resultCard}>
              <Text style={styles.resultText}>Monthly EMI</Text>
              <Text style={styles.emiValue}>₹ {emi}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  resultCard: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 14,
    color: "#666",
  },
  emiValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
    color: "#222",
  },
});