import { Button, Image, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AddRole() {

  const saveAndPublish = () => {

  }

  const cancel = () => {

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
        <Button
          onPress={cancel}
          title="Save & Publish"
          color="#FFFFFF"
          />
        <Button
          onPress={saveAndPublish}
          title="Save & Publish"
          color="#FFFFFF"
          />
      </View>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});