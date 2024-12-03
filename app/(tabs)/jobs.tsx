import {StyleSheet, Image, TouchableOpacity, Modal, Pressable} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useRole, UserRole } from "@/contexts/RoleContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState } from "react";
import {IconSymbol} from "../../components/ui/IconSymbol";
import {StyleGuide} from "@/constants/StyleGuide";

export default function Jobs() {
  const { role } = useRole();
  const [modal, setModal] = useState(false);
  const handleTakeQuiz = () => {
    router.replace('/takeQuiz');
  }
  const handleEditQuiz = () => {
    router.replace('/editquiz');
  }
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Job Preferences</ThemedText>
      </ThemedView>

      <TouchableOpacity onPress={() => setModal(true)} style={styles.head}>
        <ThemedText style={{alignItems: "center"}}>
          If this is the first time you open this page:
        </ThemedText>
        <ThemedText style={styles.linkText}>
          What is a job preference quiz?
        </ThemedText>
      </TouchableOpacity>

      <Modal
        visible={modal}
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        <ThemedView style={styles.modalStyle}>
          <ThemedText style={{fontSize: 20, fontWeight: "bold"}}>What is a Job Preference Quiz?</ThemedText>
          <ThemedText style={{ marginTop: 30, marginBottom: 20, marginVertical: 1}}>
            The Job Preferences Quiz can help enthusiastic volunteers find roles that fit their skills and preferences.{"\n\n"}
            If you are a volunteer, you can take this quiz to learn what event roles might suit your preferences.{"\n\n"}
            If you are an event organizer, you can contribute questions to improve this quiz.{"\n"}
            You can also create new job types and then associate the results of this quiz with existing job types!
          </ThemedText>
          <TouchableOpacity onPress={() => setModal(false)} style={styles.modalButton}>
            <ThemedText>Close</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>

      <ThemedView style={{alignItems: "center", paddingTop:30 }}>
        <ThemedText style={{fontSize: 20, fontWeight:"bold"}}>Find a Job Type that's right for you</ThemedText>
      </ThemedView>

      <Pressable style={StyleGuide.primary_button_1} onPress={handleTakeQuiz}>
        <ThemedText style={StyleGuide.button_text}>Take Quiz</ThemedText>
      </Pressable>

      {role === UserRole.EVENT_ORGANIZER ? (
        <ThemedView>
          <ThemedView style={{alignItems: "center" }}>
            <ThemedText style={{fontSize: 20, fontWeight:"bold", paddingTop: 15, paddingBottom: 10}}>↑ OR ↓</ThemedText>
          </ThemedView>

          <ThemedView style={{alignItems: "center", paddingTop: 15, paddingBottom: 15 }}>
            <ThemedText style={{fontSize: 20, fontWeight:"bold"}}>Help Improve Out Quiz by Editing </ThemedText>
          </ThemedView>

          <Pressable style={StyleGuide.primary_button_2} onPress={handleEditQuiz}>
            <ThemedText style={StyleGuide.button_text}>Edit Quiz</ThemedText>
          </Pressable>

        </ThemedView>
      ) : null}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  head: {
    marginVertical: 30,
    alignItems: "center",
  },
  linkText: {
    alignItems: "center",
    fontSize: 20,
    color: "#6CB4EE",
    textDecorationLine: "underline",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  take: {
    backgroundColor: "#5F9EA0",
    marginVertical: 20,
  },
  edit: {
    backgroundColor: "#002D62",
    marginVertical: 20,
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalButton: {
    backgroundColor: "#0a7ea4",
    padding: 10,
    borderRadius: 10,
  },
});