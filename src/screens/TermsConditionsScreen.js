import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/common/AppHeader";

export default function TermsConditionsScreen() {
  const [refreshing, setRefreshing] = useState(false);

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
        <AppHeader title={"Terms & Conditions"} />

        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.title}>Terms & Conditions</Text>

            <Text style={styles.text}>
              Welcome to our application. By accessing or using this app, you agree
              to be bound by the following terms and conditions. Please read them
              carefully.
            </Text>

            {/* Section 1 */}
            <Text style={styles.heading}>1. Usage of App</Text>
            <Text style={styles.text}>
              You agree to use this application only for lawful purposes. You must
              not misuse the app or attempt to access it using methods other than
              the interface provided.
            </Text>

            {/* Section 2 */}
            <Text style={styles.heading}>2. User Account</Text>
            <Text style={styles.text}>
              You are responsible for maintaining the confidentiality of your
              account and password. Any activity under your account will be your
              responsibility.
            </Text>

            {/* Section 3 */}
            <Text style={styles.heading}>3. Data & Privacy</Text>
            <Text style={styles.text}>
              We respect your privacy. Your data is handled securely and will not
              be shared with third parties without your consent, except as required
              by law.
            </Text>

            {/* Section 4 */}
            <Text style={styles.heading}>4. Limitation of Liability</Text>
            <Text style={styles.text}>
              We are not responsible for any damages or losses arising from the use
              of this application. Use the app at your own risk.
            </Text>

            {/* Section 5 */}
            <Text style={styles.heading}>5. Changes to Terms</Text>
            <Text style={styles.text}>
              We may update these terms from time to time. Continued use of the app
              means you accept the updated terms.
            </Text>

            {/* Footer */}
            <Text style={styles.footer}>
              Last updated: April 2026
            </Text>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 10,
    color: "#222",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});