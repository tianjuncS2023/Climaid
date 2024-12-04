import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { useQuestions } from "@/contexts/QuestionContext";
import { StyleGuide } from "@/constants/StyleGuide";

export default function addQuestion() {
  const { addQuestion, getQuestionListSize } = useQuestions();
  const [quizQuestion, setQuizQuestion] = useState("");
  const [keywords, setKeywords] = useState("");

  const isSaveEnabled =
    quizQuestion.trim() !== "" && keywords.split(",").length > 1;

  const handleSave = () => {
    if (isSaveEnabled) {
      const newQuestion = {
        id: getQuestionListSize() + 1,
        text: quizQuestion.trim(),
        keywordList: keywords.split(",").map((tag) => tag.trim()),
      };
      addQuestion(newQuestion);
      setQuizQuestion("");
      setKeywords("");
      router.replace("/editquiz");
    }
  };

  const handleCancel = () => {
    setQuizQuestion("");
    setKeywords("");
    router.replace("/editquiz");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView>
        <ThemedText style={StyleGuide.header2}>
          What is the Quiz Question?
        </ThemedText>
        <TextInput
          style={styles.input}
          value={quizQuestion}
          onChangeText={setQuizQuestion}
          placeholder="Provide a question. The question should be a statement, e.g., I enjoy going outside. Then, volunteers can either agree or disagree with it."
          multiline
        />
      </ThemedView>

      <ThemedView>
        <ThemedText style={StyleGuide.header2}>Question Keywords</ThemedText>
        <TextInput
          style={styles.input}
          value={keywords}
          placeholder="Use comma (,) to separate each keyword, for example, tag1,tag2,tag3."
          onChangeText={setKeywords}
          multiline
        />
      </ThemedView>

      <ThemedView>
        <ThemedText style={StyleGuide.text}>
          Note: After clicking "Save & Publish", your question will be displayed
          in the quiz. Volunteers answer the question by rating it from 1
          (strongly disagree) to 10 (strongly agree).
        </ThemedText>

        <ThemedText style={[styles.label, StyleGuide.header2]}>
          Like This ↓
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            marginTop: 16,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={StyleGuide.cancel_button}
            onPress={handleCancel}
          >
            <ThemedText style={StyleGuide.button_text}>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              StyleGuide.primary_button_1,
              !isSaveEnabled && StyleGuide.disabled_button,
            ]}
            onPress={handleSave}
            disabled={!isSaveEnabled}
          >
            <ThemedText style={StyleGuide.button_text}>
              Save & Publish
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    color: "#000000",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginTop: 10,
  },
  label: {
    textAlign: "center",
    marginBottom: 8,
  },
});
