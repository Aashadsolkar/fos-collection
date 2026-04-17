import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/auth/useAuth";

export default function CustomDrawerContent(props) {
    const { logout } = useAuth();

    return (
        <SafeAreaView edges={["bottom",]} style={styles.container}>
            {/* Top Section */}
            <View style={styles.header}>
                <Text style={styles.title}>FOS</Text>
            </View>

            {/* Drawer Items */}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ paddingTop: 10 }}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Bottom Logout */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    header: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#ffb300a8",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    footer: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        padding: 10,
    },
    logoutBtn: {
        padding: 12,
    },
    logoutText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
    },
});