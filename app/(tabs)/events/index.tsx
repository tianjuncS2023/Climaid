import { useRouter } from "expo-router";
import {StyleSheet, FlatList, Pressable, Text, Button, ScrollView} from "react-native";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRole, UserRole } from "@/contexts/RoleContext";

export default function EventsList() {
  const { events } = useEventContext();
  const router = useRouter();
  const { role } = useRole();
  const handleCreateEvent = () => {
    router.push(`/(tabs)/create_events`);
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Events</ThemedText>
        {role === UserRole.EVENT_ORGANIZER && (
          <Button title={"Create Event"} onPress={handleCreateEvent} />
        )}
      </ThemedView>
      <FlatList
          style={styles.list}
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
        scrollEnabled={false}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom:100
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
});
