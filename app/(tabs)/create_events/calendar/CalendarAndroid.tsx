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
        markedDates={
          selectedDate
            ? {
                [selectedDate.toISOString().split("T")[0]]: {
                  selected: true,
                  selectedColor: "#000000",
                },
              }
            : {}
        }
        theme={{
          todayTextColor: "#0a7ea4",
          selectedDayBackgroundColor: "#000000",
          selectedDayTextColor: "#ffffff",
        }}
      />

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <ThemedText style={styles.timeLabel}>Start Time:</ThemedText>
          <Pressable
            style={[styles.timeButton, !startTime && styles.timeButtonEmpty]}
            onPress={() => setShowStartTime(true)}
          >
            <ThemedText style={styles.timeButtonText}>
              {formatTime(startTime)}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.timeSection}>
          <ThemedText style={styles.timeLabel}>End Time:</ThemedText>
          <Pressable
            style={[styles.timeButton, !endTime && styles.timeButtonEmpty]}
            onPress={() => setShowEndTime(true)}
          >
            <ThemedText style={styles.timeButtonText}>
              {formatTime(endTime)}
            </ThemedText>
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
            if (date && event.type !== "dismissed") {
              onStartTimeChange(date);
            }
          }}
          style={styles.timePicker}
        />
      )}

      {showEndTime && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          is24Hour={false}
          onChange={(event, date) => {
            setShowEndTime(false);
            if (date && event.type !== "dismissed") {
              onEndTimeChange(date);
            }
          }}
          style={styles.timePicker}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  timeContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  timeButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  timeButtonEmpty: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  timeButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  timePicker: {
    backgroundColor: "#fff",
  },
});
