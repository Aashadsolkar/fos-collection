import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AllocationScreen from "../screens/allocation/AllocationScreen";
import DispositionScreen from "../screens/disposition/DispositionScreen";
import ReportScreen from "../screens/report/ReportScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Allocation" component={AllocationScreen} />
      <Tab.Screen name="Disposition" component={DispositionScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}