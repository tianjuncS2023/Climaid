import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import {useRole} from "@/contexts/RoleContext";
import {StyleSheet} from "react-native";
import PreferencesForm from "@/components/PreferencesForm";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {IconSymbol} from "@/components/ui/IconSymbol";

export default function TakeQuiz (){
    const { role } = useRole();

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
                <ThemedText type="title">Preferences Quiz</ThemedText>
            </ThemedView>
            <ThemedText type={"default"}>Do you prefer an outdoorsy activity? Do you prefer contributing behind the scenes? Tell us how you would prefer to contribute!</ThemedText>

            <PreferencesForm ></PreferencesForm>
        </ParallaxScrollView>
    )
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
    view: {
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