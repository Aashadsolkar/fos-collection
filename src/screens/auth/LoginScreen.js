// screens/auth/LoginScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppInput from "../../components/form/AppInput";
import { useAuth } from "../../hooks/auth/useAuth";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await login(username, password);

    if (res.success) {
      // Checksum ke saath PasscodeScreen pe navigate karo
      navigation.navigate("Passcode", { checksum: res.checksum });
    }
    // Failure case: Snackbar globally handled hai
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

      <View>
        <AppInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter Username"
          error={errors.username}
        />

        <AppInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry={secure}
          toggleSecure={() => setSecure(!secure)}
          error={errors.password}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E3D6",
    justifyContent: "center",
    paddingHorizontal: 30,
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
  loginButton: {
    backgroundColor: "#F4C400",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000",
  },
});