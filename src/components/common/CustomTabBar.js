// components/navigation/CustomTabBar.js

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function CustomTabBar({ state, navigation, tabs }) {
  const translateX = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const horizontalMargin = 10;
  const containerWidth = width - horizontalMargin * 2;
  const tabWidth = containerWidth / tabs.length;

  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth, {
      duration: 250,
      easing: Easing.out(Easing.quad),
    });
  }, [state.index]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          left: horizontalMargin,
          right: horizontalMargin,
          bottom: insets.bottom + 10,
        },
      ]}
    >
      <Animated.View
        style={[styles.indicator, { width: tabWidth }, animatedIndicatorStyle]}
      />

      {tabs.map((tab, index) => {
        const focused = state.index === index;
        const isBig = tab.big || false;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(tab.name)}
            style={styles.tabButton}
          >
            <Ionicons
              name={focused ? tab.activeIcon : tab.icon}
              size={isBig ? 30 : 24}
              color={focused ? "#FFFFFF" : "#6B9E7A"}
            />

            <Text
              style={[
                styles.label,
                isBig && styles.bigLabel,
                focused && styles.activeLabel,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    height: 75,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1E8D8",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },

  indicator: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 18,
    zIndex: 0,
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  label: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "500",
    color: "#6B9E7A",
  },

  bigLabel: {
    fontSize: 12,
  },

  activeLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
