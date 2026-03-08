import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Button,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/common/AppHeader";
import { useChangePassword } from "../../context/ChangePasswordContext";
import AppInput from "../../components/form/AppInput";

export default function ChangePasswordScreen({ navigation }) {

    const { changePassword, loading } = useChangePassword();

    const [form, setForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleSubmit = async () => {

        if (!form.current_password || !form.new_password || !form.confirm_password) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (form.new_password !== form.confirm_password) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        const res = await changePassword(form);

        if (res.success) {
            Alert.alert("Success", "Password changed successfully");
            navigation.goBack();
        } else {
            Alert.alert("Error", res.message);
        }
    };

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />

            <SafeAreaView edges={[]} style={styles.safeArea}>

                <AppHeader title="Change Password" />

                <ScrollView contentContainerStyle={styles.container}>


                    <AppInput label={"Current Password"} placeholder={"Current Password"} secureTextEntry={true} value={form.current_password} onChangeText={(v) => handleChange("current_password", v)} />

                    <AppInput label={"New Password"} placeholder={"New Password"} secureTextEntry={true} value={form.confirm_password} onChangeText={(v) => handleChange("new_password", v)} />

                    <AppInput label={"Confirm Password"} placeholder={"Confirm Password"} secureTextEntry={true} value={form.new_password} onChangeText={(v) => handleChange("confirm_password", v)} />

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title={loading ? "Updating..." : "Change Password"}
                            onPress={handleSubmit}
                        />
                    </View>

                </ScrollView>

            </SafeAreaView>
        </>
    );
}

const Input = ({ label, value, onChange, secure }) => {
    return (
        <View style={styles.inputBox}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                secureTextEntry={secure}
                onChangeText={onChange}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#EFE7D5",
    },

    container: {
        padding: 20,
    },

    inputBox: {
        marginBottom: 16,
    },

    label: {
        marginBottom: 6,
        color: "#444",
    },

    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
    },

});