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
import { StyleGuide } from "@/constants/StyleGuide";

export default function Calendar() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleConfirm = () => {
    if (!selectedDate || !endTime) {
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

      <ThemedView style={styles.buttonContainer}>
        <Pressable
          style={StyleGuide.secondary_button_2}
          onPress={() => router.back()}
        >
          <ThemedText style={StyleGuide.button_text_dark}>Cancel</ThemedText>
        </Pressable>
        <Pressable
          style={[
            StyleGuide.primary_button_1,
            (!selectedDate || !endTime) && StyleGuide.disabled_button,
          ]}
          onPress={handleConfirm}
          disabled={!selectedDate || !endTime}
        >
          <ThemedText style={StyleGuide.button_text}>Confirm</ThemedText>
        </Pressable>
      </ThemedView>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  previewButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  previewButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
