import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Button,Image, Pressable } from "react-native";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import { StyleGuide } from "@/constants/StyleGuide";


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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{event.title}</ThemedText>
      </ThemedView>
      <View style={styles.rowGroup}>
        <View style={styles.row}>
          <Image source={require("@/assets/images/date.png")} style={styles.tinyLogo}/>
          <Text style={styles.subtitle}>{event.date}</Text>
        </View>
        <View style={styles.row}>
          <Image source={require("@/assets/images/pin.png")} style={styles.tinyLogo}/>
          <Text style={styles.subtitle}>{event.location}</Text>
        </View>
      </View>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.subtitle}>{event.details}</Text>
      <Text style={styles.title}>What to bring</Text>
      <Text style={styles.subtitle}>{event.bring}</Text>
      <View style={styles.button}>
      <Pressable     style={[
        StyleGuide.primary_button_1,
        event.joined ? StyleGuide.disabled_button : StyleGuide.primary_button_2,
    ]} onPress={handleJoin} disabled={event.joined}>
        <ThemedText style={StyleGuide.button_text}>{event.joined ? "Already Joined" : "Join Event"}</ThemedText>
      </Pressable>
      </View>
    </View>
  </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 20
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10,
  },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", paddingTop: 20 },
  subtitle: { fontSize: 16, marginVertical: 10 },
  tinyLogo: { width: 20, height: 20, margin:5},
  rowGroup: {

  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
