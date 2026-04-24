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
import { useAllocation } from "../../context/AllocationContext";
import AppHeader from "../../components/common/AppHeader";

export default function UnTouchedAllocation({ navigation }) {
  const {
    allocations,
    filter,
    fetchAllocations,
    loadMore,
  } = useAllocation();

  const [refreshing, setRefreshing] = useState(false);

  // ✅ HAR BAAR screen focus hone pe fresh API call
  useFocusEffect(
    useCallback(() => {
      fetchAllocations("", 1, false, 1);
    }, [filter])
  );

  // ✅ Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAllocations("", 1, true, 1);
    } catch (e) {
      console.log("Refresh Error:", e);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Pagination
  const handleLoadMore = () => {
    loadMore("", 1);
  };

  const isEmpty = !allocations || allocations.length === 0;

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />

      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <AppHeader title="Allocation" />

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Untouched Allocation</Text>
        </View>

        {/* List */}
        <View style={styles.container}>
          {isEmpty ? (
            // ✅ Empty state — always perfectly centered
            <View style={styles.emptyWrapper}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>No Allocations Found</Text>
              <Text style={styles.emptySubtitle}>Pull down to refresh</Text>
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

  headingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D1E8D8",
    backgroundColor: "#FFFFFF",
  },

  headingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A1F10",
    letterSpacing: 0.2,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#F5F9F6",
  },

  // ✅ Empty state
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
