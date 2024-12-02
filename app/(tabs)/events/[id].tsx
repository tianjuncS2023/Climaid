import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Button,Image } from "react-native";
import { useEventContext } from "@/contexts/EventContext";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const { events, joinEvent } = useEventContext();
  const router = useRouter();

  const event = events.find((e) => e.id === id);
  if (!event) return <Text>Event not found</Text>;

  const handleJoin = () => {
    joinEvent(event.id);
    router.push(`/events/success?id=${event.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.row}>
        <Image source={require("@/assets/images/date.png")} style={styles.tinyLogo}/>
        <Text style={styles.subtitle}>{event.date}</Text>
      </View>
      <View style={styles.row}>
        <Image source={require("@/assets/images/pin.png")} style={styles.tinyLogo}/>
        <Text style={styles.subtitle}>{event.location}</Text>
      </View>
      <Text style={styles.title}>details</Text>
      <Text style={styles.subtitle}>{event.details}</Text>
      <Text style={styles.title}>what to bring</Text>
      <Text style={styles.subtitle}>{event.bring}</Text>
      <Button
        title={event.joined ? "Already Joined" : "Join Event"}
        onPress={handleJoin}
        disabled={event.joined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginVertical: 10 },
  tinyLogo: { width: 20, height: 20},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
