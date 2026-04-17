import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AllocationScreen from "../screens/allocation/AllocationScreen";
import DispositionScreen from "../screens/disposition/DispositionScreen";
import ReportScreen from "../screens/report/ReportScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CustomTabBar from "../components/common/CustomTabBar";
const Tab = createBottomTabNavigator();

const tabs = [
  { name: "Dashboard", icon: "home-outline", activeIcon: "home" },
  { name: "Allocation", icon: "layers-outline", activeIcon: "layers" },
  {
    name: "Disposition",
    icon: "swap-horizontal-outline",
    activeIcon: "swap-horizontal",
  },
  { name: "Report", icon: "bar-chart-outline", activeIcon: "bar-chart" },
  { name: "Profile", icon: "person-outline", activeIcon: "person" },
];

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={(props) => <CustomTabBar {...props} tabs={tabs} />}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Allocation" component={AllocationScreen} />
      <Tab.Screen name="Disposition" component={DispositionScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}