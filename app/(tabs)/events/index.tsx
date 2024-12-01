import { useRouter } from "expo-router";
import { StyleSheet, FlatList, Pressable, Text, View } from "react-native";
import { useEventContext } from "@/contexts/EventContext";

export default function EventsList() {
  const { events } = useEventContext();
  const router = useRouter();

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() => router.push(`/events/${item.id}`)}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.date}</Text>
          <Text style={styles.subtitle}>
            {item.joined ? "Joined" : "Not Joined"}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
});
