import React, { useState } from "react";
import { StyleSheet, View, Pressable, Platform } from "react-native";
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
  minDate?: Date;
}

export default function CalendarAndroid({
  selectedDate,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  minDate,
}: CalendarAndroidProps) {
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const formatTime = (date: Date | null) => {
    if (!date) return "Select time";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderTimePicker = () => {
    if (Platform.OS === "web") {
      return (
        <View style={styles.timeContainer}>
          <View style={styles.timeSection}>
            <ThemedText style={styles.timeLabel}>Start Time:</ThemedText>
            <input
              type="time"
              value={startTime ? startTime.toTimeString().slice(0, 5) : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":");
                const newDate = new Date();
                newDate.setHours(parseInt(hours), parseInt(minutes));
                onStartTimeChange(newDate);
              }}
              style={styles.webTimePicker}
            />
          </View>

          <View style={styles.timeSection}>
            <ThemedText style={styles.timeLabel}>End Time:</ThemedText>
            <input
              type="time"
              value={endTime ? endTime.toTimeString().slice(0, 5) : ""}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(":");
                const newDate = new Date();
                newDate.setHours(parseInt(hours), parseInt(minutes));
                onEndTimeChange(newDate);
              }}
              style={styles.webTimePicker}
            />
          </View>
        </View>
      );
    }

    return (
      <>
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
                if (!endTime || date <= endTime) {
                  onStartTimeChange(date);
                } else {
                  alert("Start time cannot be later than end time");
                }
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
                if (!startTime || date >= startTime) {
                  onEndTimeChange(date);
                } else {
                  alert("End time cannot be earlier than start time");
                }
              }
            }}
            style={styles.timePicker}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: DateData) => {
          const date = new Date(day.timestamp);
          onDateChange(date);
        }}
        minDate={minDate?.toISOString().split("T")[0]}
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

      {renderTimePicker()}
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
    gap: 16,
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  timeLabel: {
    marginRight: 16,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    minWidth: 120,
  },
  timeButtonEmpty: {
    borderStyle: "dashed",
  },
  timeButtonText: {
    textAlign: "center",
  },
  timePicker: {
    backgroundColor: "#fff",
  },
  webTimePicker: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    minWidth: 120,
  },
});
