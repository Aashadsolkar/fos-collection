import React, { createContext, useContext, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [period, setPeriod] = useState("today");
  const [customDate, setCustomDate] = useState(null);

  const fetchDashboard = async (
    selectedPeriod = period,
    selectedDate = customDate
  ) => {
    try {
      const res = await getDashboardSummary({
        period: selectedPeriod,
        date: selectedDate,
      });

      if (res.success && res.data?.status === "success") {
        setSummary(res.data.data.summary);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        summary,
        period,
        setPeriod,
        customDate,
        setCustomDate,
        fetchDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);