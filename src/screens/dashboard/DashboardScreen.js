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

  useEffect(() => {
    fetchDashboard(period, customDate);
  }, [period, customDate]);

  const onRefresh = async () => {
    setRefreshing(true);

    // 🔥 Global loader off karna ho toh apiRequest me showLoader:false karo
    await fetchDashboard();

    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FFF" }}></SafeAreaView>
      <SafeAreaView edges={[]}>
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
                  title="Today's Total Allocation"
                  value={summary.total_allocations}
                />
                <StatsGrid summary={summary} />
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