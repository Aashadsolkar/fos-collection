import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import PeriodFilter from "../../components/dashboard/PeriodFilter";
import SummaryCard from "../../components/dashboard/SummaryCard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AppHeader from "../../components/common/AppHeader";
import { useDashboard } from "../../context/DashboardContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const {
    summary,
    period,
    setPeriod,
    customDate,
    setCustomDate,
    fetchDashboard,
  } = useDashboard();

  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  console.log(summary, "_________________________)0000");
  

  useEffect(() => {
    fetchDashboard(period, customDate);
  }, [period, customDate]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboard();
    setRefreshing(false);
  };

  
// ✅ Helper: Returns a display label based on selected period
const getAllocationTitle = (customDate) => {
  if (!customDate) return "Today's";

  const today = new Date();
  const selected = new Date(customDate);

  const isToday =
    selected.getDate() === today.getDate() &&
    selected.getMonth() === today.getMonth() &&
    selected.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  // Format: 07 Apr 2026
  const formatted = selected.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${formatted}`;
  
}

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }} />
      <SafeAreaView edges={["bottom"]}>
        <AppHeader title={"Dashboard"} showDrawer={true} />
        <View style={styles.container}>

          <DashboardHeader
            onFilterPress={() => setShowFilter(prev => !prev)}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {showFilter && (
              <PeriodFilter
                period={period}
                setPeriod={setPeriod}
                setCustomDate={setCustomDate}
              />
            )}

            {summary && (
              <>
                <SummaryCard
                  title={`${getAllocationTitle(customDate)} Total Allocation`} // ✅ Dynamic title
                  value={summary.total_allocations}
                />
                <StatsGrid summary={summary} date={getAllocationTitle(customDate)} />
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
  },
});