import { StyleSheet, Image, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { router } from "expo-router";
import { useRole, UserRole } from "@/contexts/RoleContext";

export default function Jobs() {
  const { role } = useRole();
  const handleTakeQuiz = () => {
    router.replace("/(tabs)\takeQuiz\takeQuiz");
  }
  const handleEditQuiz = () => {
    router.replace("/(tabs)editQuizeditQuiz");
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Jobs</ThemedText>
      </ThemedView>
      <Pressable style={styles.button} onPress={handleTakeQuiz}>
          <ThemedText style={styles.buttonText}>Take Quiz</ThemedText>
        </Pressable>
      {role === UserRole.EVENT_ORGANIZER ? 
        <Pressable style={styles.button} onPress={handleEditQuiz}>
          <ThemedText style={styles.buttonText}>Edit Quiz</ThemedText>
        </Pressable> : null}
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    minWidth: 240,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 220,
    gap: 20,
  },
});
