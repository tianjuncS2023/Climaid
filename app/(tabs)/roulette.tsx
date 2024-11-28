import React from "react";
import { StyleSheet, Image } from "react-native";
import RouletteWheel from "@/components/RouletteWheel";
import { ThemedView } from "@/components/ThemedView";
import globalStorage from "@/util/globalContext";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Roulette() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#FFD6E0", dark: "#1F1D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<RouletteWheel />
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
