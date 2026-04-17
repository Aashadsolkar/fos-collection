import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabs from "./BottomTabs";

import AllocationDetailsScreen from "../screens/allocation/AllocationDetailsScreen";
import DispositionDetailScreen from "../screens/disposition/DispositionDetailsScreen";
import DispositionFormScreen from "../screens/disposition/DispositionFormScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* ✅ Only this will show in drawer */}
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{
          title: "Home",
        }}
      />

      {/* ❌ Hidden Screens */}
      <Drawer.Screen
        name="AllocationDetails"
        component={AllocationDetailsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="DispositionDetails"
        component={DispositionDetailScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="DispositionForm"
        component={DispositionFormScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}