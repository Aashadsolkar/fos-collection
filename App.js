import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import AppProviders from "./src/providers/AppProviders";

import GlobalLoader from "./src/components/GlobalLoader";
import OfflineBanner from "./src/components/OfflineBanner";

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>

      <GlobalLoader />
      <OfflineBanner />
    </AppProviders>
  );
}