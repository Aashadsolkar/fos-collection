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
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/common/AppHeader";

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
   <>
   <SafeAreaView edges={["top"]} style={{backgroundColor: "#fff"}}></SafeAreaView>
   <SafeAreaView edges={[]}>
    <AppHeader title={"Allocation"}/>
     <View style={styles.container}>
      <FlatList
        data={allocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AllocationCard
            item={item}
            onPress={() =>
              navigation.navigate("AllocationDetails", {
                id: item.id
              })
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
   </SafeAreaView>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});