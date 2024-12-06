import { useRouter } from "expo-router";
import {
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { StyleGuide } from "@/constants/StyleGuide";
import {Preferences, usePreferences} from "@/contexts/PreferencesContext";

export default function EventsList() {
  const { preferences } = usePreferences();
  const { events } = useEventContext();
  const router = useRouter();
  const { role } = useRole();
  const joinedevent = events.filter((event) => event.joined);
  let otherevent = events.filter((event) => !event.joined);
  const handleCreateEvent = () => {
    router.push(`/(tabs)/create_events`);
  };

  function score(jobTypes: string[], preferences: Preferences): number {
    if (jobTypes.length == 0) return 0;
    let test: { [key: string]: number } = {
      "indoors": preferences.indoors,
      "outdoors": preferences.outdoors,
      "teamLeader": preferences.teamLeaders,
      "teamPlayer": preferences.teamPlayers
    }
    let totalScore = 1.0;
    for (let job of jobTypes) {
      totalScore = totalScore + (test[job]) as number;
    }

    return totalScore;
  }

  otherevent = otherevent.sort((a, b) => score(b.jobTypes, preferences) - score(a.jobTypes, preferences));

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
        <ThemedText type="title">My Events</ThemedText>
        <ThemedText type="title"></ThemedText>
        {role === UserRole.EVENT_ORGANIZER && (
          <Pressable
            style={StyleGuide.primary_button_2_small}
            onPress={handleCreateEvent}
          >
            <ThemedText style={StyleGuide.button_text_small}>
              Create Event
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>

      <FlatList
        data={joinedevent}
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
        ListEmptyComponent={
          <ThemedText type="subtitle">No events joined yet.</ThemedText>
        }
        scrollEnabled={false}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Other Events</ThemedText>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <FlatList
        data={otherevent}
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
        ListEmptyComponent={
          <ThemedText type="subtitle">No other events available.</ThemedText>
        }
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
    paddingBottom: 100,
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
    alignItems: "center",
  },
});
