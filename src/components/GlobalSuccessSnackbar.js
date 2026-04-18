import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { SuccessContext } from "../context/SuccessContext";

const GlobalSuccessSnackbar = () => {
  const { success } = useContext(SuccessContext);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (success) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2500);
    }
  }, [success]);

  if (!success) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.text}>{success}</Text>
    </Animated.View>
  );
};

export default GlobalSuccessSnackbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: "#52c41a",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    zIndex: 999, // 👈 ensure top pe dikhe
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});