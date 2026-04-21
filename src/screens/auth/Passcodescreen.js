// screens/auth/PasscodeScreen.js

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";

export default function PasscodeScreen({ navigation, route }) {
  const { verifyPasscode } = useAuth();

  // LoginScreen se checksum aaya hai
  const { checksum } = route.params;

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // ===============================
  // Ek box mein type karo, agle pe auto-focus
  // ===============================
  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1); // sirf 1 digit
    const newPasscode = [...passcode];
    newPasscode[index] = digit;
    setPasscode(newPasscode);
    setError("");

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = passcode.join("");

    if (code.length < 4) {
      setError("Please enter 4-digit passcode");
      return;
    }

    const res = await verifyPasscode(checksum, code);

    if (!res.success) {
      setError(res.message || "Invalid passcode");
      setPasscode(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
    // Success case: token set ho gaya, navigator automatically main screen pe le jayega
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={{ color: "#f4c400" }}>Collection</Text>Module
        </Text>
      </View>

      <Text style={styles.title}>Enter Passcode</Text>
      <Text style={styles.subtitle}>4-digit passcode enter karo</Text>

      {/* 4 Boxes */}
      <View style={styles.boxesContainer}>
        {passcode.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.box,
              digit ? styles.boxFilled : null,
              error ? styles.boxError : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            secureTextEntry
            autoFocus={index === 0}
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        activeOpacity={0.8}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E3D6",
    justifyContent: "center",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  boxesContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  boxFilled: {
    borderColor: "#F4C400",
    backgroundColor: "#fff9e0",
  },
  boxError: {
    borderColor: "#e53935",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#e53935",
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: "#F4C400",
    height: 45,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  verifyText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    color: "#666",
    fontSize: 14,
  },
});