import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Button,Image } from "react-native";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";


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
  </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginVertical: 10 },
  tinyLogo: { width: 20, height: 20, margin:5},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
