import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/common/AppHeader";

export default function HelpSupportScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // dummy refresh
  };

  return (
    <>
      {/* Top Safe Area */}
      <SafeAreaView edges={["top"]} style={styles.topSafeArea} />

      {/* Main Area */}
      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <AppHeader title={"Help & Support"} />

        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* 🔹 FAQ Section */}
            <Text style={styles.sectionTitle}>FAQs</Text>

            <View style={styles.card}>
              <Text style={styles.question}>
                How to check my allocations?
              </Text>
              <Text style={styles.answer}>
                Go to Allocation tab and select your desired filter.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.question}>
                How to contact support?
              </Text>
              <Text style={styles.answer}>
                You can fill the form below or email us directly.
              </Text>
            </View>

            {/* 🔹 Contact Info */}
            <Text style={styles.sectionTitle}>Contact Us</Text>

            <View style={styles.card}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>support@yourapp.com</Text>

              <Text style={[styles.label, { marginTop: 10 }]}>
                Phone:
              </Text>
              <Text style={styles.value}>+91 9876543210</Text>
            </View>

            {/* 🔹 Message Form */}
            <Text style={styles.sectionTitle}>Send Message</Text>

            <View style={styles.card}>
              <TextInput
                placeholder="Type your issue here..."
                value={message}
                onChangeText={setMessage}
                multiline
                style={styles.input}
              />

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#FFF",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  question: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  answer: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  input: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },
});