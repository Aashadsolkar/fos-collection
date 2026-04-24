import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import AllocationCard from "../../components/allocation/AllocationCard";
import AppHeader from "../../components/common/AppHeader";
import { useAllocation } from "../../context/AllocationContext";

export default function AllocationScreen({ navigation }) {
  const {
    allocations,
    filter,
    fetchAllocations,
    loadMore,
  } = useAllocation();

  const [refreshing, setRefreshing] = useState(false);

  // ✅ HAR BAAR screen focus hone pe API call
  useFocusEffect(
    useCallback(() => {
      fetchAllocations("today", 1, false, 1);
    }, [filter])
  );

  // ✅ Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAllocations("today", 1, true, 1);
    } catch (e) {
      console.log("Refresh Error:", e);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Pagination (load more)
  const handleLoadMore = () => {
    loadMore("today", 1);
  };

  const isEmpty = !allocations || allocations.length === 0;

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.topSafeArea} />

      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <AppHeader title="Allocation" />

        <View style={styles.container}>
          {isEmpty ? (
            // ✅ Empty state — FlatList se bahar, pure View mein
            <View style={styles.emptyWrapper}>
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#22C55E"
                colors={["#22C55E"]}
              />
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No Allocations Available Today</Text>
              {/* <Text style={styles.emptySubtitle}>Pull down to refresh</Text> */}
            </View>
          ) : (
            <FlatList
              data={allocations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AllocationCard
                  item={item}
                  onPress={() =>
                    navigation.navigate("AllocationDetails", { id: item.id })
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#22C55E"
                  colors={["#22C55E"]}
                />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#F5F9F6",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9F6",
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F9F6",
  },

  // ✅ Empty state — always perfectly centered
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 44,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A1F10",
    marginBottom: 4,
  },

  emptySubtitle: {
    fontSize: 13,
    color: "#6B9E7A",
    fontWeight: "500",
  },
});
