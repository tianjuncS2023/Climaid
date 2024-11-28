import { Button, Image, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

export const navigationOptions = {
  headerShown: false,
};

export default function EditQuiz() {

  const addQuestion = () => {
    router.replace('/addquestion');
  }

  const addRole = () => {
    router.replace('/addrole');
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView>
        <ThemedText>Note: This Quiz helps volunteers discover volunteer roles that match their interests. You can enhance this quiz by adding more questions for more precise insights or creating new role types for better recommendations.</ThemedText>
      </ThemedView>
      <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ fontSize: 25 }}>Question List✔️</ThemedText>
        </ThemedView>
        <Button
          onPress={addQuestion}
          title="Add Question"
          color="#FFFFFF"
          />
      </View>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    minWidth: 240,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 220,
    gap: 20,
  },
});