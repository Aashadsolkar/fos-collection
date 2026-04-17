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
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = date => {
    setPickerVisible(false);
    const formatted = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formatted);
    setCustomDate(formatted);
    setPeriod(null);
  };

  const getDateForOffset = offsetDays =>
    dayjs().subtract(offsetDays, "day").format("YYYY-MM-DD");

  const handleQuickSelect = (label, offsetDays) => {
    const date = getDateForOffset(offsetDays);
    setSelectedDate(date);
    setCustomDate(date);
    setPeriod(label);
  };

  const quickOptions = [
    { label: "Today",              offset: 0 },
    { label: "Yesterday",          offset: 1 },
    { label: "Day Before Yesterday", offset: 2 },
  ];

  return (
    <View style={styles.container}>
      {quickOptions.map(({ label, offset }) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.button,
            period === label && styles.activeButton,
          ]}
          onPress={() => handleQuickSelect(label, offset)}
        >
          <Text
            style={[
              styles.text,
              period === label && styles.activeText,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Custom Date Picker */}
      <TouchableOpacity
        style={[
          styles.button,
          period === null && selectedDate &&
            !quickOptions.some(o => o.label === period) &&
            styles.activeButton,
        ]}
        onPress={() => setPickerVisible(true)}
      >
        <Text style={styles.text}>
          {period === null && selectedDate
            ? selectedDate        // shows picked date e.g. 2026-04-06
            : "Custom Select"}
        </Text>
      </TouchableOpacity>

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