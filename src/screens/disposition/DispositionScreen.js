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

import { useDisposition } from "../../context/DispositionContext";
import DispositionTabs from "../../components/disposition/DispositionTabs";
import DispositionCard from "../../components/disposition/DispositionCard";
import AppHeader from "../../components/common/AppHeader";

export default function DispositionScreen({ navigation }) {
  const {
    items,
    period,
    setPeriod,
    fetchDispositions,
    loadMore,
  } = useDisposition();

  const [refreshing, setRefreshing] = useState(false);

  // ✅ HAR BAAR screen focus hone pe fresh API call
  useFocusEffect(
    useCallback(() => {
      fetchDispositions(period, 1);
    }, [period])
  );

  // ✅ Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDispositions(period, 1, true);
    } catch (e) {
      console.log("Refresh Error:", e);
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Pagination
  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <>
      {/* Top Safe Area */}
      <SafeAreaView edges={["top"]} style={styles.topSafeArea} />

      {/* Main Area */}
      <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
        <AppHeader title={"Disposition"} />

        <View style={styles.container}>
          {/* Tabs */}
          <DispositionTabs period={period} setPeriod={setPeriod} />

          {/* List */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DispositionCard
                item={item}
                onPress={() =>
                  navigation.navigate("DispositionDetails", {
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
                No Dispositions Found
              </Text>
            }
            contentContainerStyle={
              items?.length === 0 ? styles.emptyContainer : styles.listStyle
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
    backgroundColor: "#fff",
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
  listStyle:{
    paddingBottom: 120
  }
});