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
import { DispositionDetailsProvider } from "./src/context/DispositionDetailsContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import { DispositionFormProvider } from "./src/context/DispositionFormContext";
import { ChangePasswordProvider } from "./src/context/ChangePasswordContext";

export default function App() {
  return (
    <AuthProvider>
      <ErrorProvider>
        <LoaderProvider>
          <NetworkProvider>
            <ChangePasswordProvider>
            <NotificationProvider>
              <DashboardProvider>
                <DispositionProvider>
                  <AllocationProvider>
                    <DispositionDetailsProvider>
                      <DispositionFormProvider>
                        <NavigationContainer>
                          <RootNavigator />
                        </NavigationContainer>
                      </DispositionFormProvider>
                    </DispositionDetailsProvider>
                  </AllocationProvider>
                </DispositionProvider>
              </DashboardProvider>
            </NotificationProvider>
            <GlobalLoader />
            <OfflineBanner />
            </ChangePasswordProvider>
          </NetworkProvider>
        </LoaderProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}