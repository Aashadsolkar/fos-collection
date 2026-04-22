import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import PeriodFilter from "../../components/dashboard/PeriodFilter";
import SummaryCard from "../../components/dashboard/SummaryCard";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AppHeader from "../../components/common/AppHeader";
import { useDashboard } from "../../context/DashboardContext";

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

  // ✅ HAR BAAR screen focus hone pe fresh API call
  useFocusEffect(
    useCallback(() => {
      fetchDashboard(period, customDate);
    }, [period, customDate])
  );

  // ✅ Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDashboard(period, customDate);
    } catch (e) {
      console.log("Refresh Error:", e);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Helper for title
  const getAllocationTitle = (customDate) => {
    if (!customDate) return "Today's";

    const today = new Date();
    const selected = new Date(customDate);

    const isToday =
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear();

    if (isToday) return "Today";

    const formatted = selected.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formatted;
  };

  return (
    <>
      {/* Top Safe Area */}
      <SafeAreaView edges={["top"]} style={styles.topSafeArea} />

      {/* Main Area */}
      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <AppHeader title={"Dashboard"} showDrawer={true} />

        <View style={styles.container}>
          <DashboardHeader
            onFilterPress={() => setShowFilter((prev) => !prev)}
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
                  title={`${getAllocationTitle(customDate)} Total Allocation`}
                  value={summary.total_allocations}
                />
                <StatsGrid
                  summary={summary}
                  date={getAllocationTitle(customDate)}
                />
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#FFF",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
  },
});