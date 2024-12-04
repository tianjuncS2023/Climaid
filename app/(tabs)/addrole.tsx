import { StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useState } from "react";
import { useJobs } from "@/contexts/JobContext";
import { StyleGuide } from "@/constants/StyleGuide";

export default function addRole() {
  const { addJob, getJobListSize } = useJobs();
  const [jobName, setJobName] = useState("");
  const [jobDes, setJobDes] = useState("");
  const [keywords, setKeywords] = useState("");
  const isSaveEnabled = jobName.trim() !== "" && jobDes.trim() !== "" && keywords.length>0;

  const handleSave = () => {
    if (isSaveEnabled) {
      const newJob = {
        id: getJobListSize() + 1,
        name: jobName.trim(),
        description: jobDes.trim(),
        keywordList: keywords.split(",").map((tag) => tag.trim()),
      };
      addJob(newJob);
      setJobName("");
      setJobDes("");
      setKeywords("");
      router.replace("/editquiz");
    }
  };

  const handleCancel = () => {
    setJobName("");
    setJobDes("");
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
          Name of the result (Volunteer Role)?
        </ThemedText>
        <TextInput
          style={styles.input}
          value={jobName}
          placeholder="Provide a name for the volunteer role."
          onChangeText={setJobName}
        />
      </ThemedView>

      <ThemedView>
        <ThemedText style={StyleGuide.header2}>
          Short Description of the Role
        </ThemedText>
        <TextInput
          style={styles.input}
          value={jobDes}
          placeholder="Describe the responsibilities of this volunteer role. This will also become visible to volunteers who have completed the quiz so that they can understand their role better."
          onChangeText={setJobDes}
          multiline
        />
      </ThemedView>

    <ThemedView>
      <ThemedText style={StyleGuide.header2}>Job Type Keywords</ThemedText>
      <TextInput
        style={styles.input}
        value={keywords}
        placeholder="Enter several keywords of this volunteer role. Use comma (,) to separate each keyword, for example, tag1,tag2,tag3."
        onChangeText={setKeywords}
        multiline
      />
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
});
