import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Button,Image, FlatList } from "react-native";
import { useEventContext } from "@/contexts/EventContext";

export default function SuccessPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const { events } = useEventContext();

  const event = events.find((e) => e.id === id);
  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success! You've Joined the Event</Text>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.row}>
        <Image source={require("@/assets/images/date.png")} style={styles.tinyLogo}/>
        <Text style={styles.subtitle}>{event.date}</Text>
      </View>
      <View style={styles.row}>
        <Image source={require("@/assets/images/pin.png")} style={styles.tinyLogo}/>
        <Text style={styles.subtitle}>{event.location}</Text>
      </View>
      <Button title="Go Back to Events" onPress={() => router.push("/events")} />
    
    
      <View style={styles.container}>
        <Text style={styles.title}>Volunteer List:</Text>
        <FlatList
          data={event.volunteers}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.volunteerItem}>
              <Image source={typeof item.avatar === "string" ? { uri: item.avatar } : item.avatar} style={styles.avatar}/>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center",padding: 20, },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, marginBottom: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  tinyLogo: { width: 20, height: 20},
  volunteerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#555",
  },
});
