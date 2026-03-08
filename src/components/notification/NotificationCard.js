import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNotification } from "../../context/NotificationContext";

export default function NotificationCard({ item }) {

  const { markAsRead } = useNotification();

  const handlePress = () => {

    if (!item.read_at) {
      markAsRead(item.id);
    }

  };

  return (

    <TouchableOpacity
      style={[
        styles.card,
        !item.read_at && styles.unreadCard
      ]}
      activeOpacity={0.8}
      onPress={handlePress}
    >

      {/* TITLE */}

      <Text style={styles.title}>
        {item.title}
      </Text>


      {/* BODY */}

      <Text style={styles.body}>
        {item.body}
      </Text>


      {/* FOOTER */}

      <View style={styles.footer}>

        <Text style={styles.time}>
          {new Date(item.created_at).toLocaleString()}
        </Text>

        {!item.read_at && (
          <View style={styles.dot} />
        )}

      </View>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F4B400",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  body: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    fontSize: 11,
    color: "#999",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#F4B400",
  },

});