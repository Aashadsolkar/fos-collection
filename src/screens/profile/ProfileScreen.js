import React, { useEffect } from "react";
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

export default function ProfileScreen({ navigation }) {

  const { profile } = useProfile();
  
  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#F3C300" }} />

      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <ScrollView>

          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#F3C300" />
            </View>

            <View>
              <Text style={styles.name}>{profile?.name}</Text>
              <Text style={styles.role}>Field Agent</Text>
            </View>

          </View>

          {/* MENU */}

          <View style={styles.menuContainer}>

            <MenuItem
              icon="settings-outline"
              title="Settings"
              onPress={() => navigation.navigate("Settings")}
            />

            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />

            <MenuItem
              icon="calculator-outline"
              title="Emi Calculator"
              onPress={() => navigation.navigate("EmiCalculator")}
            />

            <MenuItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => navigation.navigate("Help")}
            />

            <MenuItem
              icon="document-text-outline"
              title="Terms & Conditions"
              onPress={() => navigation.navigate("Terms")}
            />

            <MenuItem
              icon="lock-closed-outline"
              title="Change Password"
              onPress={() => navigation.navigate("ChangePassword")}
            />

            <MenuItem
              icon="log-out-outline"
              title="Logout"
              logout
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
    backgroundColor: "#F3EFE5",
  },

  header: {
    backgroundColor: "#F3C300",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginRight: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000"
  },

  role: {
    color: "#333",
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

});