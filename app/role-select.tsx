import { router } from "expo-router";
import { StyleSheet, Pressable, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { StyleGuide } from "@/constants/StyleGuide";

export default function RoleSelect() {
  const { setRole } = useRole();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    router.replace("/events");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedView>
          <Image
            source={require("@/assets/images/climaid-logo.png")}
            style={styles.image}
          />
        </ThemedView>
        <ThemedText type="title">Welcome to Climaid!</ThemedText>
        <ThemedText type="subtitle"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <Pressable
          style={StyleGuide.primary_button_2}
          onPress={() => handleRoleSelect(UserRole.EVENT_ORGANIZER)}
        >
          <ThemedText style={StyleGuide.button_text}>
            Event Organizer
          </ThemedText>
        </Pressable>
        <Pressable
          style={StyleGuide.primary_button_2}
          onPress={() => handleRoleSelect(UserRole.VOLUNTEER)}
        >
          <ThemedText style={StyleGuide.button_text}>
            Event Volunteer
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: { width: 200, height: 200 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  button: {
    ...StyleGuide.primary_button_2,
    minWidth: 240,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
    gap: 20,
  },
});
