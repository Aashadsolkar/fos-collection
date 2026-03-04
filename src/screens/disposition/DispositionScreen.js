import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from "react-native";

import { useDisposition } from "../../context/DispositionContext";
import DispositionTabs from "../../components/disposition/DispositionTabs";
import DispositionCard from "../../components/disposition/DispositionCard";

export default function DispositionScreen() {
  const {
    items,
    period,
    setPeriod,
    fetchDispositions,
    loadMore,
  } = useDisposition();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDispositions(period, 1);
  }, [period]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDispositions(period, 1, true);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <DispositionTabs period={period} setPeriod={setPeriod} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DispositionCard item={item} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No Dispositions Found
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
    backgroundColor: "#EFE7D5",
  },
});