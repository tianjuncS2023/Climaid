import { Image, StyleSheet, Button, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useQuestions } from "@/contexts/QuestionContext";
import { useJobs } from "@/contexts/JobContext";
import { StyleGuide } from "@/constants/StyleGuide";

export const navigationOptions = {
  headerShown: false,
};

export default function EditQuiz() {
  const { questions } = useQuestions();
  const extractedList = questions.map(({ id, text }) => ({ id, text }));
  const { jobs } = useJobs();
  const extractedJobList = jobs.map(({ id, name }) => ({ id, name }));

  const addQuestion = () => {
    router.replace("/addquestion");
  };

  const addRole = () => {
    router.replace("/addrole");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView>
        <ThemedText style={StyleGuide.text}>
          Note: This Quiz helps volunteers discover volunteer roles that match
          their interests. You can enhance this quiz by adding more questions
          for more precise insights or creating new role types for better
          recommendations.
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.header}>
          <ThemedText style={StyleGuide.header2}>Questions List 📝</ThemedText>
          <TouchableOpacity
            style={[
              { left: 38 },
              StyleGuide.primary_button_1,
              { transform: [{ scale: 0.7 }] },
            ]}
            onPress={addQuestion}
          >
            <ThemedText style={{ color: "white", fontWeight: "bold" }}>
              Add Question
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        {extractedList.map((item, index) => (
          <ThemedView key={item.id.toString()} style={[styles.listItem, index == extractedList.length - 1 && {backgroundColor: "#E2F1E7"}]}>
            <ThemedView style={StyleGuide.circle}>
              <ThemedText style={{ color: "white" }}>
                {item.id.toString()}
              </ThemedText>
            </ThemedView>
            <ThemedText>{item.text}</ThemedText>
            {index === extractedList.length - 1 && (
              <ThemedView style={StyleGuide.tag_new}>
                <ThemedText style={StyleGuide.button_text}> NEW </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.header}>
          <ThemedText style={StyleGuide.header2}>
            Suitable Job Matches 🌱
          </ThemedText>
          <TouchableOpacity
            style={[
              StyleGuide.primary_button_2,
              { transform: [{ scale: 0.7 }] },
            ]}
            onPress={addRole}
          >
            <ThemedText style={{ color: "white", fontWeight: "bold" }}>
              Add Role
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        {extractedJobList.map((item, index) => (
          <ThemedView key={item.id.toString()} style={[styles.listItem, index == extractedJobList.length - 1 && {backgroundColor: "#E2F1E7"}]}>
            <ThemedView style={StyleGuide.circle}>
              <ThemedText style={{ color: "white" }}>
                {item.id.toString()}
              </ThemedText>
            </ThemedView>
            <ThemedText>{item.name}</ThemedText>
            {index === extractedJobList.length - 1 && (
              <ThemedView style={StyleGuide.tag_new}>
                <ThemedText style={StyleGuide.button_text}> NEW </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
  },
});
