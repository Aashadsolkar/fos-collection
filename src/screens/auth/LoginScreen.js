// screens/auth/LoginScreen.js

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  StatusBar,
  Dimensions,
} from "react-native";
import AppInput from "../../components/form/AppInput";
import { useAuth } from "../../hooks/auth/useAuth";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
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

  const validate = () => {
    let newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Minimum 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();

    setLoading(true);
    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      navigation.navigate("Passcode", { checksum: res.checksum });
    }
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
          {/* Logo section */}
          <Animated.View
            style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}
          >
            <View style={styles.logoWrapper}>
              <Image
                source={require("../../../assets/pinelabs_logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </Animated.View>

          {/* Header text */}
          <View style={styles.headerSection}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.subText}>Sign in to your account</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <AppInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (errors.username) setErrors((e) => ({ ...e, username: undefined }));
              }}
              placeholder="Username"
              error={errors.username}
            />

            <View style={{ marginTop: 14 }}>
              <AppInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                }}
                placeholder="Password"
                secureTextEntry={secure}
                toggleSecure={() => setSecure(!secure)}
                error={errors.password}
              />
            </View>

            {/* <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity> */}

            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonLoading]}
                onPress={handleLogin}
                activeOpacity={0.85}
                disabled={loading}
              >
                <Text style={styles.loginText}>
                  {loading ? "Signing in..." : "Sign In"}
                </Text>
                {!loading && <View style={styles.arrowIcon}><Ionicons name="arrow-forward" size={12} color="#fff" /></View>}
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.divider} />
            <Text style={styles.footerText}>Secured by Pine Labs</Text>
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

  // Decorative bg elements
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
  },

  // Logo
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoWrapper: {
    width: 200,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  logo: {
    width: 120,
    height: 64,
  },

  // Header
  headerSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subText: {
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  // Forgot password
  forgotRow: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 13,
    color: "#22C55E",
    fontWeight: "600",
  },

  // Button
  loginButton: {
    backgroundColor: "#22C55E",
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 15
  },
  loginButtonLoading: {
    backgroundColor: "#16A34A",
  },
  loginText: {
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

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    gap: 12,
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
