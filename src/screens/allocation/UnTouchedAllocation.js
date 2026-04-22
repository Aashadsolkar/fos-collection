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

  return (
    <>
      {/* Top Safe Area */}
      <SafeAreaView style={styles.topSafeArea} edges={["top"]} />

      {/* Main Area */}
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <AppHeader title={"Allocation"} />

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Untouched Allocation</Text>
        </View>

        {/* List */}
        <View style={styles.container}>
          <FlatList
            data={allocations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AllocationCard
                item={item}
                onPress={() =>
                  navigation.navigate("AllocationDetails", {
                    id: item.id,
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No Allocations Found
              </Text>
            }
            contentContainerStyle={
              allocations?.length === 0 && styles.emptyContainer
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  headingContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});