import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  View,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { StyleGuide } from "@/constants/StyleGuide";

export default function CreateEvent() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    details: "",
    bring: "",
  });

  useEffect(() => {
    if (params.date) {
      setEventData((prev) => ({
        ...prev,
        date: params.date as string,
      }));
    }
  }, [params.date]);

  const handlePreview = () => {
    if (
      !eventData.title ||
      !eventData.date ||
      !eventData.location ||
      !eventData.details ||
      !eventData.bring
    ) {
      alert("Please fill out all fields");
      return;
    }
    router.push({
      pathname: "/create_events/preview",
      params: eventData,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
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
        onScroll={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
      >
        <ThemedText type="title">Create Event</ThemedText>

        <ThemedText style={styles.label}>Event Name</ThemedText>
        <TextInput
          style={styles.input}
          value={eventData.title}
          onChangeText={(text) => setEventData({ ...eventData, title: text })}
        />

        <ThemedText style={styles.label}>Date & Time</ThemedText>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/create_events/calendar",
              params: { ...eventData, date: eventData.date },
            })
          }
          style={styles.dateTimeContainer}
        >
          <TextInput
            style={[styles.input, styles.dateInput]}
            value={eventData.date}
            editable={false}
            placeholder="Select date and time"
            placeholderTextColor="#666"
            multiline={false}
            numberOfLines={1}
          />
          <IconSymbol
            name="chevron.right"
            size={20}
            color="#666"
            style={styles.chevron}
          />
        </Pressable>

        <ThemedText style={styles.label}>Location</ThemedText>
        <TextInput
          style={styles.input}
          value={eventData.location}
          onChangeText={(text) =>
            setEventData({ ...eventData, location: text })
          }
        />

        <ThemedText style={styles.label}>Details</ThemedText>
        <TextInput
          style={[styles.input, styles.multiline]}
          multiline
          value={eventData.details}
          onChangeText={(text) => setEventData({ ...eventData, details: text })}
        />

        <ThemedText style={styles.label}>What to Bring</ThemedText>
        <TextInput
          style={[styles.input, styles.multiline]}
          multiline
          value={eventData.bring}
          onChangeText={(text) => setEventData({ ...eventData, bring: text })}
        />

        <ThemedView style={styles.buttonContainer}>
          <Pressable
            style={StyleGuide.secondary_button_2}
            onPress={() => router.replace("/events")}
          >
            <ThemedText style={StyleGuide.button_text_dark}>Cancel</ThemedText>
          </Pressable>
          <Pressable
            style={StyleGuide.primary_button_1}
            onPress={handlePreview}
          >
            <ThemedText style={StyleGuide.button_text}>Preview</ThemedText>
          </Pressable>
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 44,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  dateInput: {
    flex: 1,
    borderWidth: 0,
    height: 44,
    textAlignVertical: "center",
    paddingVertical: 0,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    minHeight: 44,
    paddingRight: 10,
  },
  chevron: {
    marginLeft: 8,
  },
});
