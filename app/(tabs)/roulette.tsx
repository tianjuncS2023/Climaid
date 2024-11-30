import React from "react";
import { StyleSheet, Image } from "react-native";
import RouletteWheel from "@/components/RouletteWheel";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Roulette() {
	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Spin for a Role!</ThemedText>
			</ThemedView>
			<ThemedView style={styles.rouletteContainer}>
				<RouletteWheel />
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	rouletteContainer: {
		flexDirection: "row",
		gap: 8,
	},
	container: {
		flex: 1,
		alignItems: "center",
		gap: 40,
	},
	titleContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 220,
		gap: 20,
	},
});
