import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ icon, title, onPress, logout }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>

      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color="#E6B800" />

        <Text style={[styles.menuText, logout && { color: "red" }]}>
          {title}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />

    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 10,
    fontSize: 15,
  },
});