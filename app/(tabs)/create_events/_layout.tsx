import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Create Event" }} />
      <Stack.Screen name="calendar" options={{ title: "Select Date" }} />
      <Stack.Screen name="preview" options={{ title: "Preview" }} />
      <Stack.Screen name="success" options={{ title: "Success" }} />
    </Stack>
  );
}
