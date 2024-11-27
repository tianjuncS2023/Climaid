import { router } from "expo-router";
import { StyleSheet, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRole, UserRole } from "@/contexts/RoleContext";

export default function RoleSelect() {
  const { setRole } = useRole();

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    router.replace("/events");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Climaid!</ThemedText>
        <ThemedText type="subtitle"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => handleRoleSelect(UserRole.EVENT_ORGANIZER)}
        >
          <ThemedText style={styles.buttonText}>Event Organizer</ThemedText>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => handleRoleSelect(UserRole.VOLUNTEER)}
        >
          <ThemedText style={styles.buttonText}>Volunteer</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
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
