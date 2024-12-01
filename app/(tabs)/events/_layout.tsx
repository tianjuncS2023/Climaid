import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Event List" }} />
      <Stack.Screen name="[id]" options={{ title: "Event Details" }} />
      <Stack.Screen name="success" options={{ title: "Success" }} />
    </Stack>
  );
}
