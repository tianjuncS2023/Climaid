import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Modal } from "react-native";

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
  const [modal, setModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const isSaveEnabled = quizQuestion.trim() !== "" && keywords.length>0;

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
      Alert.alert("Thanks!",
        "You have sucessully created a quiz question."
      )
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
        <TouchableOpacity onPress={() => setModal(true)} style={styles.head}>
          <ThemedText style={[{alignItems: "center"}, {textDecorationLine: "underline"}, StyleGuide.link]}>
            I need help to write a quiz question!
          </ThemedText>
          <Modal
            visible={modal}
            animationType="slide"
            onRequestClose={() => setModal(false)}
            >
            <ThemedView style={styles.modalStyle}>
            <ThemedText style={StyleGuide.header2}>How to Write a Quiz Question</ThemedText>
            <ThemedText style={[{ marginTop: 30, marginBottom: 20, marginVertical: 1}, StyleGuide.text]}>
              A Quiz Question is a question that appears in the volunteer-job-preference quiz to help volunteers find suitable jobs.{"\n\n"}
              You need to provide the question content. It should be a statement to agree or disagree. For example: I like dog.{"\n\n"}
              It is better if you can add some keywords related to the question, like "outdoor" or "recreation".{"\n\n"}
              To add more than one keywords, use comma (,) to separate them. For example: "outdoor;recreation"
            </ThemedText>
            <TouchableOpacity onPress={() => setModal(false)} style={StyleGuide.primary_button_2}>
              <ThemedText style={{color: "white"}}>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          </Modal>
        </TouchableOpacity>
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
        placeholder="Enter several keywords of this question. Use comma (,) to separate each keyword, for example, tag1,tag2,tag3."
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
  head: {
    marginVertical: 30,
    alignItems: "center",
  },
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
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
});
