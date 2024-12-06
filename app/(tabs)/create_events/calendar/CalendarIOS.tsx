import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/ThemedText";

interface CalendarIOSProps {
  selectedDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  onDateChange: (date: Date) => void;
  onStartTimeChange: (date: Date) => void;
  onEndTimeChange: (date: Date) => void;
}

export default function CalendarIOS({
  selectedDate,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: CalendarIOSProps) {
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
          textDisabledColor: "#d9e1e8",
        }}
        minDate={new Date().toISOString().split("T")[0]}
      />

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <ThemedText>Event Starts At:</ThemedText>
          <DateTimePicker
            value={startTime || new Date()}
            mode="time"
            is24Hour={false}
            onChange={(event, date) => {
              if (date) onStartTimeChange(date);
            }}
            maximumDate={endTime || undefined}
          />
        </View>

        <View style={styles.timeSection}>
          <ThemedText>Event Ends At:</ThemedText>
          <DateTimePicker
            value={endTime || new Date()}
            mode="time"
            is24Hour={false}
            onChange={(event, date) => {
              if (date) onEndTimeChange(date);
            }}
            minimumDate={startTime || undefined}
          />
        </View>
      </View>
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
  },
});
