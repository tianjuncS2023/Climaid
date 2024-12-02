import { StyleSheet, Image, Button, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function PreviewEvent() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { events, addEvent } = useEventContext();

  const handleCreate = () => {
    const newEvent = {
      id: (events.length + 1).toString(),
      title: params.title as string,
      date: params.date as string,
      location: params.location as string,
      details: params.details as string,
      bring: params.bring as string,
      joined: false,
      volunteers: [],
    };

    addEvent(newEvent);
    router.push({
      pathname: "/create_events/success",
      params: {
        title: params.title,
        date: params.date,
        location: params.location,
      },
    });
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
      <ThemedText type="title">{params.title}</ThemedText>

      <ThemedView style={styles.row}>
        <Image
          source={require("@/assets/images/date.png")}
          style={styles.icon}
        />
        <ThemedText>{params.date}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <Image
          source={require("@/assets/images/pin.png")}
          style={styles.icon}
        />
        <ThemedText>{params.location}</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle">Details</ThemedText>
      <ThemedText>{params.details}</ThemedText>

      <ThemedText type="subtitle">What to Bring</ThemedText>
      <ThemedText>{params.bring}</ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ThemedText style={styles.backButtonText}>Back</ThemedText>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleCreate}>
          <ThemedText style={styles.createButtonText}>Create</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 32,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  createButtonText: {
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
