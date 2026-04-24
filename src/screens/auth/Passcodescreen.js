// screens/auth/PasscodeScreen.js

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
} from "react-native";
import { useAuth } from "../../hooks/auth/useAuth";
import { Ionicons } from '@expo/vector-icons';

export default function PasscodeScreen({ navigation, route }) {
  const { verifyPasscode } = useAuth();

  // LoginScreen se checksum aaya hai
  const { checksum } = route.params;

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

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
      triggerShake();
      return;
    }

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    const res = await verifyPasscode(checksum, code);

    if (!res.success) {
      setError(res.message || "Invalid passcode");
      setPasscode(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      triggerShake();
    }
    // Success case: token set ho gaya, navigator automatically main screen pe le jayega
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F9F6" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Background decorative circles */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />

        <Animated.View
          style={[
            styles.inner,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Lock icon */}
          <Animated.View
            style={[styles.iconContainer, { transform: [{ scale: logoScale }] }]}
          >
            <View style={styles.iconWrapper}>
              <Text style={styles.lockEmoji}>🔐</Text>
            </View>
          </Animated.View>

          {/* Header text */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Enter Passcode</Text>
            <Text style={styles.subtitle}>Enter your 4-digit passcode</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* 4 OTP Boxes */}
            <Animated.View
              style={[
                styles.boxesContainer,
                { transform: [{ translateX: shakeAnim }] },
              ]}
            >
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
                  selectionColor="#22C55E"
                />
              ))}
            </Animated.View>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View style={styles.errorPlaceholder} />
            )}

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerify}
                activeOpacity={0.85}
              >
                <Text style={styles.verifyText}>Verify Passcode</Text>
                <View style={styles.arrowIcon}>
                  <Ionicons name="arrow-forward" size={12} color="#fff" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>← Back to Login</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.divider} />
            <Text style={styles.footerText}>SECURED BY PINE LABS</Text>
            <View style={styles.divider} />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  bgCircle1: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#22C55E0D",
    top: -60,
    right: -80,
  },
  bgCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#22C55E08",
    bottom: 100,
    left: -60,
  },

  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    alignItems: "center",
  },

  // Icon
  iconContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  lockEmoji: {
    fontSize: 38,
  },

  // Header
  headerSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B9E7A",
    fontWeight: "400",
    letterSpacing: 0.2,
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#D1E8D8",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  // OTP Boxes
  boxesContainer: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 8,
  },
  box: {
    width: 58,
    height: 62,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#C8E0D0",
    backgroundColor: "#F5F9F6",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#0A1F10",
  },
  boxFilled: {
    borderColor: "#22C55E",
    backgroundColor: "#EDFAF3",
  },
  boxError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    marginTop: 4,
    textAlign: "center",
  },
  errorPlaceholder: {
    height: 32,
  },

  // Verify button
  verifyButton: {
    backgroundColor: "#22C55E",
    height: 50,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    minWidth: 260,
  },
  verifyText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  arrowIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // Back button
  backButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  backText: {
    color: "#6B9E7A",
    fontSize: 14,
    fontWeight: "500",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    gap: 12,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1E8D8",
  },
  footerText: {
    fontSize: 12,
    color: "#A8C8B4",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
