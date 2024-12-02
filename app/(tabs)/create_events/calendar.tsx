import { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import CalendarIOS from "./calendar/CalendarIOS";
import CalendarAndroid from "./calendar/CalendarAndroid";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";

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
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const dateString = `${formattedDate}, ${formatTime(
      startTime
    )} - ${formatTime(endTime)}`;

    router.replace({
      pathname: "/create_events",
      params: { date: dateString },
    });
  };

  const handleEndTimeChange = (date: Date) => {
    if (startTime && date < startTime) {
      alert("End time cannot be earlier than start time");
      return;
    }
    setEndTime(date);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      {Platform.OS === "ios" ? (
        <CalendarIOS
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          onDateChange={setSelectedDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={handleEndTimeChange}
          minDate={new Date()}
        />
      ) : (
        <CalendarAndroid
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          onDateChange={setSelectedDate}
          onStartTimeChange={setStartTime}
          onEndTimeChange={handleEndTimeChange}
          minDate={new Date()}
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
    </ParallaxScrollView>
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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
