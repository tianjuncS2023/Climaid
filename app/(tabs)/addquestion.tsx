import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";


import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { useQuestions } from "@/contexts/QuestionContext";

export default function addQuestion() {
  const { addQuestion, getQuestionListSize } = useQuestions();
  const [quizQuestion, setQuizQuestion] = useState("");
  const [keywords, setKeywords] = useState("");

  const isSaveEnabled = quizQuestion.trim() !== "" && keywords.split(',').length > 1;

  const handleSave = () => {
    if (isSaveEnabled) {
      const newQuestion = {
        id: getQuestionListSize() + 1,
        text: quizQuestion.trim(),
        keywordList: keywords.split(',').map((tag) => tag.trim()),
      };
      addQuestion(newQuestion);
      setQuizQuestion("");
      setKeywords("");
      router.replace('/editquiz');
    }
  };

  const handleCancel = () => {
    setQuizQuestion("");
    setKeywords("");
    router.replace('/editquiz');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
    <ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>What is the Quiz Question?</ThemedText>
      <TextInput
        style={styles.input}
        value={quizQuestion}
        onChangeText={setQuizQuestion}
      />
    </ThemedView>

    <ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Question Keywords</ThemedText>
      <TextInput
        style={styles.input}
        value={keywords}
        placeholder="Use comma (,) to separate each keyword, for example, tag1,tag2,tag3."
        onChangeText={setKeywords}
        multiline
      />
    </ThemedView>

    <ThemedView>
      <ThemedText style={styles.note}>
        Note: After clicking "Save & Publish", your question will be displayed
        in the quiz. Volunteers answer the question by rating it from 1
        (strongly disagree) to 10 (strongly agree).
      </ThemedText>

      <ThemedText style={styles.label}>Like This ↓</ThemedText>
    </ThemedView>

    <ThemedView>
      <ThemedView style={{flexDirection: "row", marginTop: 16}}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <ThemedText style={styles.buttonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, !isSaveEnabled && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isSaveEnabled}
        >
          <ThemedText style={styles.buttonText}>Save & Publish</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginTop: 10,
  },
  note: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 16,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
  },
  saveButtonDisabled: {
    backgroundColor: "#CCC",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});