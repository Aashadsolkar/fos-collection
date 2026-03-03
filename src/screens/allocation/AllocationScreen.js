import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";

import AllocationCard from "../../components/allocation/AllocationCard";
import { useAllocation } from "../../context/AllocationContext";

export default function AllocationScreen({ navigation }) {
  const {
    allocations,
    filter,
    fetchAllocations,
    loadMore,
  } = useAllocation();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllocations(filter, 1);
  }, [filter]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllocations(filter, 1, true);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AllocationCard
            item={item}
            onPress={() =>
              navigation.navigate("AllocationDetail", { data: item })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No Allocations Found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});