import { StyleSheet, Button, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { StyleGuide } from "@/constants/StyleGuide";

export default function SuccessPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

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
      <ThemedText type="title">Success! You've Created the Event!</ThemedText>

      <ThemedText type="subtitle" style={styles.eventTitle}>
        {params.title}
      </ThemedText>

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

      <ThemedView style={styles.buttonContainer}>
        <Pressable
          style={StyleGuide.primary_button_1}
          onPress={() => router.push("/events")}
        >
          <ThemedText style={StyleGuide.button_text}>Continue</ThemedText>
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
  eventTitle: {
    marginTop: 20,
    marginBottom: 10,
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
    marginTop: 32,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 200,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
