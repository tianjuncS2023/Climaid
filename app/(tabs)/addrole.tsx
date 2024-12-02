import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";


import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { useJobs } from "@/contexts/JobContext";

export default function addRole() {
  const { addJob, getJobListSize } = useJobs();
  const [jobName, setJobName] = useState("");
  const [jobDes, setJobDes] = useState("");
  const [keywords, setKeywords] = useState("");

  const isSaveEnabled = jobName.trim() !== "" && jobDes.trim() !== "" && keywords.split(',').length > 1;

  const handleSave = () => {
    if (isSaveEnabled) {
      const newJob = {
        id: getJobListSize() + 1,
        name: jobName.trim(),
        description: jobDes.trim(),
        keywordList: keywords.split(',').map((tag) => tag.trim()),
      };
      addJob(newJob);
      setJobName("");
      setJobDes("");
      setKeywords("");
      router.replace('/editquiz');
    }
  };

  const handleCancel = () => {
    setJobName("");
    setJobDes("");
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
      <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Name of the result (Volunteer Role)?</ThemedText>
      <TextInput
        style={styles.input}
        value={jobName}
        placeholder="Provide a name for the volunteer role."
        onChangeText={setJobName}
      />
    </ThemedView>

    <ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Short Description of the Role</ThemedText>
      <TextInput
        style={styles.input}
        value={jobDes}
        placeholder="Describe the responsibilities of this volunteer role. This will also become visible to volunteers who have completed the quiz so that they can understand their role better."
        onChangeText={setJobDes}
        multiline
      />
    </ThemedView>

    <ThemedView>
      <ThemedText style={{fontSize: 16, fontWeight: "bold"}}>Job Type Keywords</ThemedText>
      <TextInput
        style={styles.input}
        value={keywords}
        placeholder="Use comma (,) to separate each keyword, for example, tag1,tag2,tag3."
        onChangeText={setKeywords}
        multiline
      />
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