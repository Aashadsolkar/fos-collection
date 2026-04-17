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
import { SafeAreaView } from "react-native-safe-area-context";
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

  useEffect(() => {
    fetchDispositions(period, 1);
  }, [period]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDispositions(period, 1, true);
    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}></SafeAreaView>
      <SafeAreaView edges={["bottom"]} style={{flex: 1}}>
        <AppHeader title={"Disposition"} />
        <View style={styles.container}>
          <DispositionTabs period={period} setPeriod={setPeriod} />

          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DispositionCard item={item} onPress={() => {
                navigation.navigate("DispositionDetails", {
                  id: item.id,
                });
              }} />
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
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#EFE7D5",
  },
});