// src/components/dashboard/PeriodFilter.js

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

export default function PeriodFilter({
  period,
  setPeriod,
  setCustomDate,
}) {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = date => {
    setPickerVisible(false);

    const formatted = dayjs(date).format("YYYY-MM-DD");
    setCustomDate(formatted);
    setPeriod(null);
  };

  const renderButton = (label, value) => (
    <TouchableOpacity
      style={[
        styles.button,
        period === value && styles.activeButton,
      ]}
      onPress={() => {
        setPeriod(value);
        setCustomDate(null);
      }}
    >
      <Text
        style={[
          styles.text,
          period === value && styles.activeText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderButton("Today", "today")}
      {renderButton("This Week", "this_week")}
      {renderButton(
        "This Month",
        "this_month"
      )}

      {/* TODO */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => setPickerVisible(true)}
      >
        <Text style={styles.text}>Custom Select</Text>
      </TouchableOpacity> */}

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: "#F4C400",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  activeButton: {
    backgroundColor: "#F4C400",
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
  },
  activeText: {
    fontWeight: "700",
  },
});