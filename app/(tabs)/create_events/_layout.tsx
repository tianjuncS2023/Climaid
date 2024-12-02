import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Create Event" }} />
      <Stack.Screen name="calendar" options={{ title: "Select date" }} />
      <Stack.Screen name="preview" options={{ title: "preview" }} />
      <Stack.Screen name="success" options={{ title: "success" }} />
    </Stack>
  );
}
