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

export default function AppHeader({
  type = "home", // home | page | drawer
  title,
  userName = "User",
}) {
  const navigation = useNavigation();
  const { unreadCount } = useNotification();

  const renderLeft = () => {
    if (type === "home") {
      return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.profileWrap}>
            <View style={styles.profileCircle}>
              <Ionicons name="person" size={18} color="#fff" />
            </View>
            <Text style={styles.name}>{userName}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (type === "drawer") {
      return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} />
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
        >
          <Ionicons name="notifications-outline" size={24} />

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
    backgroundColor: "#fff",
  },
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
    backgroundColor: "#fff",
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
    fontSize: 18,
    fontWeight: "700",
  },

  profileWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F4B400",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
  },

  bellWrap: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#F4B400",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },
});