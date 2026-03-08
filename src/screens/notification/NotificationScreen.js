import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/common/AppHeader";

import NotificationCard from "../../components/notification/NotificationCard";
import { useNotification } from "../../context/NotificationContext";

export default function NotificationScreen() {

  const {
    items,
    fetchNotifications,
    loadMore,
  } = useNotification();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications(1, true);
    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }} />

      <SafeAreaView edges={[]} style={{ flex: 1 }}>
        <AppHeader  title={"Notifications"} />

        <View style={styles.container}>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item }) => (
              <NotificationCard item={item} />
            )}

            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }

            onEndReached={loadMore}
            onEndReachedThreshold={0.3}

            ListEmptyComponent={
              <Text style={styles.empty}>
                No Notifications
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
    padding: 16,
    backgroundColor: "#EFE7D5",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
  },

});