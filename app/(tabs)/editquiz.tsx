import { Image, StyleSheet, Button } from 'react-native';


import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useQuestions } from '@/contexts/QuestionContext';
import { useJobs } from '@/contexts/JobContext';

export const navigationOptions = {
  headerShown: false,
};

export default function EditQuiz() {
  const { questions } = useQuestions();
  const extractedList = questions.map(({ id, text }) => ({ id, text }));
  const { jobs } = useJobs();
  const extractedJobList = jobs.map(({ id, name }) => ({ id, name }));

  const addQuestion = () => {
    router.replace('/addquestion');
  };

  const addRole = () => {
    router.replace('/addrole');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
    <ThemedView>
      <ThemedText>
        Note: This Quiz helps volunteers discover volunteer roles that match their interests. You can enhance this quiz by adding more questions for more precise insights or creating new role types for better recommendations.
      </ThemedText>
    </ThemedView>

    
      <ThemedView>
        <ThemedView style={styles.header}>
          <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Questions List 📝</ThemedText>
          <Button title="Add Question" onPress={addQuestion} />
        </ThemedView>
        {extractedList.map((item) => (
          <ThemedView key={item.id.toString()} style={styles.listItem}>
            <ThemedView style={styles.circle}>
              <ThemedText>{item.id.toString()}</ThemedText>
            </ThemedView>
            <ThemedText>{item.text}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView>
        <ThemedView style={styles.header}>
          <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Suitable Job Matches 🌱</ThemedText>
          <Button title="Add Role" onPress={addRole} />
        </ThemedView>
        {extractedJobList.map((item) => (
          <ThemedView key={item.id.toString()} style={styles.listItem}>
            <ThemedView style={styles.circle}>
              <ThemedText>{item.id.toString()}</ThemedText>
            </ThemedView>
            <ThemedText>{item.name}</ThemedText>
          </ThemedView>
      ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DCCFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});