import { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import CalendarIOS from "./calendar/CalendarIOS";
import CalendarAndroid from "./calendar/CalendarAndroid";

export default function Calendar() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleConfirm = () => {
    if (!selectedDate || !startTime || !endTime) {
      return;
    }

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const dateString = `${formattedDate} ${formatTime(
      startTime
    )} - ${formatTime(endTime)}`;

    router.push({
      pathname: "../",
      params: { date: dateString },
    });
  };

  return (
    <ThemedView style={styles.container}>
      {Platform.OS === "ios" ? (
        <CalendarIOS
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          onDateChange={setSelectedDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      ) : (
        <CalendarAndroid
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          onDateChange={setSelectedDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      )}

      <Pressable
        style={[
          styles.confirmButton,
          (!selectedDate || !startTime || !endTime) && styles.disabledButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedDate || !startTime || !endTime}
      >
        <ThemedText style={styles.confirmButtonText}>
          Confirm Date & Time
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  confirmButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#666666",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
