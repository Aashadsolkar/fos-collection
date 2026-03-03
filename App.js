import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { ErrorProvider } from "./src/context/ErrorContext";
import { LoaderProvider } from "./src/context/LoaderContext";
import GlobalLoader from "./src/components/GlobalLoader";
import { NetworkProvider } from "./src/context/NetworkContext";
import OfflineBanner from "./src/components/OfflineBanner";
import { DashboardProvider } from "./src/context/DashboardContext";
import { AllocationProvider } from "./src/context/AllocationContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  console.log("AuthProvider:", AuthProvider);
console.log("ErrorProvider:", ErrorProvider);
console.log("LoaderProvider:", LoaderProvider);
console.log("NetworkProvider:", NetworkProvider);
console.log("DashboardProvider:", DashboardProvider);
console.log("AllocationProvider:", AllocationProvider);
console.log("GlobalLoader:", GlobalLoader);
console.log("OfflineBanner:", OfflineBanner);
console.log("RootNavigator:", RootNavigator);
  return (
    <AuthProvider>
      <ErrorProvider>
        <LoaderProvider>
          <NetworkProvider>
            <DashboardProvider>
              <AllocationProvider>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </AllocationProvider>
            </DashboardProvider>
            <GlobalLoader />
            <OfflineBanner />
          </NetworkProvider>
        </LoaderProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}