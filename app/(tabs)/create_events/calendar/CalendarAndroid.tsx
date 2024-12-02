import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/ThemedText";

interface CalendarAndroidProps {
  selectedDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  onDateChange: (date: Date) => void;
  onStartTimeChange: (date: Date) => void;
  onEndTimeChange: (date: Date) => void;
}

export default function CalendarAndroid({
  selectedDate,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: CalendarAndroidProps) {
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const formatTime = (date: Date | null) => {
    if (!date) return "Select time";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: DateData) => {
          const date = new Date(day.timestamp);
          onDateChange(date);
        }}
        theme={{
          todayTextColor: "#0a7ea4",
          selectedDayBackgroundColor: "#000000",
          selectedDayTextColor: "#ffffff",
        }}
      />

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <ThemedText>Event Starts At:</ThemedText>
          <Pressable onPress={() => setShowStartTime(true)}>
            <ThemedText>{formatTime(startTime)}</ThemedText>
          </Pressable>
        </View>

        <View style={styles.timeSection}>
          <ThemedText>Event Ends At:</ThemedText>
          <Pressable onPress={() => setShowEndTime(true)}>
            <ThemedText>{formatTime(endTime)}</ThemedText>
          </Pressable>
        </View>
      </View>

      {showStartTime && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          is24Hour={false}
          onChange={(event, date) => {
            setShowStartTime(false);
            if (date) onStartTimeChange(date);
          }}
        />
      )}

      {showEndTime && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          is24Hour={false}
          onChange={(event, date) => {
            setShowEndTime(false);
            if (date) onEndTimeChange(date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    marginTop: 20,
    gap: 20,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
