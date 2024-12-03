import { StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ExperienceMeter } from "@/components/ExperienceMeter";
import {IconSymbol} from "@/components/ui/IconSymbol";

export default function Profile() {
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
				<ThemedText type="title">Profile</ThemedText>
			</ThemedView>

			<ExperienceMeter></ExperienceMeter>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
