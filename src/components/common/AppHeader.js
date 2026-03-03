// src/components/common/AppHeader.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppHeader({
  title,
  showBack = false,
  showDrawer = false,
  rightIcon,
  onRightPress,
}) {
  const navigation = useNavigation();

  const handleLeftPress = () => {
    if (showBack) {
      navigation.goBack();
    } else if (showDrawer) {
      navigation.openDrawer();
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Icon */}
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={handleLeftPress}
          disabled={!showBack && !showDrawer}
        >
          {showBack && (
            <Ionicons name="arrow-back" size={22} color="#000" />
          )}
          {showDrawer && (
            <Ionicons name="menu" size={24} color="#000" />
          )}
        </TouchableOpacity>

        {/* Title */}
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        {/* Right Icon */}
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={onRightPress}
          disabled={!rightIcon}
        >
          {rightIcon && (
            <Ionicons name={rightIcon} size={22} color="#000" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  leftIcon: {
    width: 40,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  rightIcon: {
    width: 40,
    alignItems: "flex-end",
  },
});