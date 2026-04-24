import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProfile } from "../../context/ProfileContext";
import MenuItem from "../../components/profile/MenuItem";
import { useAuth } from "../../hooks/auth/useAuth";

export default function ProfileScreen({ navigation }) {
  const { profile } = useProfile();
  const { logout } = useAuth();

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#22C55E" }} />

      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color="#22C55E" />
            </View>

            <View>
              <Text style={styles.name}>{profile?.name}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.role}>Field Agent</Text>
              </View>
            </View>
          </View>

          {/* MENU */}
          <View style={styles.menuContainer}>
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />

            <MenuItem
              icon="calculator-outline"
              title="EMI Calculator"
              onPress={() => navigation.navigate("EmiCalculatorScreen")}
            />

            <MenuItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => navigation.navigate("HelpSupportScreen")}
            />

            <MenuItem
              icon="document-text-outline"
              title="Terms & Conditions"
              onPress={() => navigation.navigate("TermsConditionsScreen")}
            />

            {/* <MenuItem
              icon="lock-closed-outline"
              title="Change Password"
              onPress={() => navigation.navigate("ChangePassword")}
            /> */}

            <MenuItem
              icon="log-out-outline"
              title="Logout"
              onPress={() => logout()}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  header: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
    marginBottom: 4,
  },

  roleBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  role: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
