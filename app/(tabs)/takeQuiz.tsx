import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import {useRole} from "@/contexts/RoleContext";
import {StyleSheet} from "react-native";
import PreferencesForm from "@/components/PreferencesForm";

export default function TakeQuiz (){
    const { role } = useRole();

    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Preferences Quiz</ThemedText>
            <ThemedText type={"default"}>Do you prefer an outdoorsy activity? Do you prefer contributing behind the scenes? Tell us how you would prefer to contribute!</ThemedText>

            <PreferencesForm ></PreferencesForm>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,

        paddingTop: 100,
        paddingBottom: 50,
        paddingLeft: 40,
        paddingRight: 40
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});