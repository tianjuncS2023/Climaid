import { useRouter, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View, Button,Image, FlatList } from "react-native";
import { useEventContext } from "@/contexts/EventContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";


export default function SuccessPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const { events } = useEventContext();

  const event = events.find((e) => e.id === id);
  if (!event) return <Text>Event not found</Text>;

  return (
    <FlatList
      ListHeaderComponent={
        <>
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
                <ThemedText type="subtitle">Success! You have joined the event:</ThemedText>
              </ThemedView>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{event.title}</ThemedText>
              </ThemedView>
              <View style={styles.rowGroup}>
                <View style={styles.row}>
                  <Image source={require("@/assets/images/date.png")} style={styles.tinyLogo} />
                  <Text style={styles.subtitle}>{event.date}</Text>
                </View>
                <View style={styles.row}>
                  <Image source={require("@/assets/images/pin.png")} style={styles.tinyLogo} />
                  <Text style={styles.subtitle}>{event.location}</Text>
                </View>
              </View>

              <View style={styles.button}>
                <Button title="Go Back to Events" onPress={() => router.push("/events")} />
              </View>

            </View>
          </ParallaxScrollView>
          <Text style={styles.title}>Volunteer List:</Text>
        </>
      }
      data={event.volunteers}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.volunteerItem}>
          <Image
            source={typeof item.avatar === "string" ? { uri: item.avatar } : item.avatar}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
        </View>
      )}
    />
  );
}


const styles = StyleSheet.create({
  button: {
    paddingTop: 20
  },
  container: { flex: 1, height: 240 },
  title: { paddingTop:20, paddingBottom:20, paddingLeft: 20 },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  subtitle: { fontSize: 16, marginBottom: 10 },
  rowGroup: {
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10
  },
  tinyLogo: { width: 20, height: 20, margin:5},
  volunteerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 20
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
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
