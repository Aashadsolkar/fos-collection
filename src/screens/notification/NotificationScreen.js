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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications(1, true);
    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#F5F9F6" }} />

      <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#F5F9F6" }}>
        <AppHeader title="Notifications" />

        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${item.id}_${index}`}

            renderItem={({ item }) => (
              <NotificationCard item={item} />
            )}

            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#22C55E"
                colors={["#22C55E"]}
              />
            }

            onEndReached={loadMore}
            onEndReachedThreshold={0.3}

            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔔</Text>
                <Text style={styles.emptyTitle}>No Notifications</Text>
                <Text style={styles.emptySubtitle}>You're all caught up!</Text>
              </View>
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
    backgroundColor: "#F5F9F6",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyIcon: {
    fontSize: 40,
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
