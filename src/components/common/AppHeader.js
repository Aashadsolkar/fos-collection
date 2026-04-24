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
import { useNotification } from "../../context/NotificationContext";
import { useProfile } from "../../context/ProfileContext";

export default function AppHeader({
  type = "home", // home | page | drawer
  title,
  userName = "User",
}) {
  const navigation = useNavigation();
  const { unreadCount } = useNotification();
  const { profile } = useProfile();

  const renderLeft = () => {
    if (type === "home") {
      return (
        <TouchableOpacity>
          <View style={styles.profileWrap}>
            <View style={styles.profileCircle}>
              <Ionicons name="person" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.name}>{profile?.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (type === "drawer") {
      return (
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#0A1F10" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color="#0A1F10" />
      </TouchableOpacity>
    );
  };

  const renderTitle = () => {
    if (type === "home") return null;
    return <Text style={styles.title}>{title}</Text>;
  };

  const renderRight = () => {
    if (type === "home" || type === "drawer") {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={styles.bellWrap}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={24} color="#0A1F10" />

          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return <View style={{ width: 24 }} />;
  };

  return (
    <SafeAreaView edges={[]} style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.left}>{renderLeft()}</View>
        <View style={styles.center}>{renderTitle()}</View>
        <View style={styles.right}>{renderRight()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#FFFFFF",
  },

  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#D1E8D8",
    backgroundColor: "#FFFFFF",
  },

  left: {
    width: 120,
    justifyContent: "flex-start",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  right: {
    width: 40,
    alignItems: "flex-end",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: 0.2,
  },

  // Home type — profile pill
  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#22C55E",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A1F10",
  },

  // Page type — back button
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EDFAF3",
    borderWidth: 1,
    borderColor: "#C8E0D0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Notification bell
  bellWrap: {
    position: "relative",
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EDFAF3",
    borderWidth: 1,
    borderColor: "#C8E0D0",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
});
