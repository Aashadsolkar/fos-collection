import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProfileScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
        <Text>Text password</Text>
      </TouchableOpacity>
    </View>
  );
}