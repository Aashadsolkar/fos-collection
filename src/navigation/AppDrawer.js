import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

import DispositionForm from "../screens/disposition/DispositionForm";
import AllocationDetailsScreen from "../screens/allocation/AllocationDetailsScreen";
import DispositionDetailScreen from "../screens/disposition/DispositionDetailsScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import DispositionFormScreen from "../screens/disposition/DispositionFormScreen";
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Bottom Tabs as Main Screen */}
      <Drawer.Screen name="MainTabs" component={BottomTabs} />

      {/* Hidden Detail Screens */}
      <Drawer.Screen name="AllocationDetails" component={AllocationDetailsScreen} />
      <Drawer.Screen name="DispositionDetails" component={DispositionDetailScreen} />
      <Drawer.Screen name="DispositionForm" component={DispositionFormScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      {/* Extra Screen */}
    </Drawer.Navigator>
  );
}