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
import { DispositionProvider } from "./src/context/DispositionContext";

export default function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <LoaderProvider>
          <NetworkProvider>
            <DashboardProvider>
              <DispositionProvider>
                <AllocationProvider>
                  <NavigationContainer>
                    <RootNavigator />
                  </NavigationContainer>
                </AllocationProvider>
              </DispositionProvider>
            </DashboardProvider>
            <GlobalLoader />
            <OfflineBanner />
          </NetworkProvider>
        </LoaderProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}