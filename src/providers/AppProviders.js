import React from "react";

import { AuthProvider } from "../context/AuthContext";
import { ProfileProvider } from "../context/ProfileContext";
import { NotificationProvider } from "../context/NotificationContext";
import { AppInitProvider } from "../context/AppInitialContext";

import { ErrorProvider } from "../context/ErrorContext";
import { LoaderProvider } from "../context/LoaderContext";
import { NetworkProvider } from "../context/NetworkContext";

import { ChangePasswordProvider } from "../context/ChangePasswordContext";

import { DashboardProvider } from "../context/DashboardContext";
import { DispositionProvider } from "../context/DispositionContext";
import { AllocationProvider } from "../context/AllocationContext";
import { DispositionDetailsProvider } from "../context/DispositionDetailsContext";
import { DispositionFormProvider } from "../context/DispositionFormContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NotificationProvider>
          <AppInitProvider>

            <ErrorProvider>
              <LoaderProvider>
                <NetworkProvider>

                  <ChangePasswordProvider>
                    <DashboardProvider>
                      <DispositionProvider>
                        <AllocationProvider>
                          <DispositionDetailsProvider>
                            <DispositionFormProvider>
                              {children}
                            </DispositionFormProvider>
                          </DispositionDetailsProvider>
                        </AllocationProvider>
                      </DispositionProvider>
                    </DashboardProvider>
                  </ChangePasswordProvider>

                </NetworkProvider>
              </LoaderProvider>
            </ErrorProvider>

          </AppInitProvider>
        </NotificationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}