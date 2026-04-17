import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import AppDrawer from "./AppDrawer";
import { AuthContext } from "../context/AuthContext";
import GlobalSnackbar from "../components/GlobalSnackbar";
import AppInitLoader from "../components/common/AppInitialLoader";
import { useAppInit } from "../context/AppInitialContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token, loading } = useContext(AuthContext);
   const { appReady } = useAppInit();

  // =========================
  // SHOW SPLASH LOADER WHILE CHECKING TOKEN
  // =========================
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // APP INITIALIZATION LOADER
  if (token && !appReady) {
    return <AppInitLoader />;
  }

  // =========================
  // CONDITIONAL NAVIGATION
  // =========================
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          // If token exists → Main App
          <Stack.Screen name="App" component={AppDrawer} />
        ) : (
          // If no token → Login Flow
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
      {/* 🔥 Global Error Snackbar */}
      <GlobalSnackbar />
    </>
  );
}