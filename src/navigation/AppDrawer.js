import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

import AllocationDetails from "../screens/allocation/AllocationDetails";
import DispositionDetails from "../screens/disposition/DispositionDetails";
import DispositionForm from "../screens/disposition/DispositionForm";

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
      <Drawer.Screen name="AllocationDetails" component={AllocationDetails} />
      <Drawer.Screen name="DispositionDetails" component={DispositionDetails} />
      <Drawer.Screen name="DispositionForm" component={DispositionForm} />

      {/* Extra Screen */}
    </Drawer.Navigator>
  );
}