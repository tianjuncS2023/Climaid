import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import {
	GestureHandlerRootView,
	GestureDetector,
	Gesture,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing,
	runOnJS,
} from "react-native-reanimated";

const Wheel = () => {
	return (
		<>
			<ThemedView style={styles.circleRow}>
				<ThemedView style={[styles.pizza, styles.pizzaRed]}>
					<ThemedText
						style={[
							styles.label,
							{ transform: "rotateZ(-135deg)" },
						]}
					>
						Digging Crew
					</ThemedText>
				</ThemedView>

				<ThemedView style={[styles.pizza, styles.pizzaBlue]}>
					<ThemedText
						style={[styles.label, { transform: "rotateZ(-45deg)" }]}
					>
						Planting Crew
					</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.circleRow}>
				<ThemedView style={[styles.pizza, styles.pizzaGreen]}>
					<ThemedText
						style={[styles.label, { transform: "rotateZ(135deg)" }]}
					>
						Refreshments Crew
					</ThemedText>
				</ThemedView>
				<ThemedView style={[styles.pizza, styles.pizzaYellow]}>
					<ThemedText
						style={[styles.label, { transform: "rotateZ(45deg)" }]}
					>
						Cleanup Crew
					</ThemedText>
				</ThemedView>
			</ThemedView>
		</>
	);
};

const RouletteWheel = () => {
	const rotation = useSharedValue(0);
	const [hasSpun, setHasSpun] = useState(false);
	const [winner, setWinner] = useState<string | null>(null);

	// Throttle updates with a lastUpdate variable
	let lastUpdate = Date.now();

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ rotateZ: `${rotation.value}deg` }],
		};
	});

	const gesture = Gesture.Pan()
		.onUpdate((e) => {
			if (hasSpun) return;

			// Throttle updates to ~60fps
			const now = Date.now();
			if (now - lastUpdate > 16) {
				const clampedVelocity = Math.max(
					-5000,
					Math.min(5000, e.velocityY)
				); // Clamp velocity
				rotation.value = rotation.value + clampedVelocity / 100;
				lastUpdate = now;
			}
		})
		.onEnd((e) => {
			if (hasSpun) return;

			runOnJS(setHasSpun)(true);
			const finalSpin = Math.min(
				5000,
				Math.abs(e.velocityY) + Math.random() * 2000 + 360
			);

			rotation.value = withTiming(
				rotation.value + finalSpin,
				{
					duration: 3000,
					easing: Easing.bezier(0.23, 1, 0.32, 1),
				},
				(_) => {
					let winner = "";

					const angle = rotation.value % 360;
					if (angle < 91) {
						winner = "Red";
					} else if (angle < 181) {
						winner = "Green";
					} else if (angle < 271) {
						winner = "Yellow";
					} else {
						winner = "Blue";
					}
					runOnJS(setWinner)(winner);
				}
			);
		});

	return (
		<>
			<ThemedView style={styles.rouletteWheelContainer}>
				<GestureHandlerRootView>
					<GestureDetector gesture={gesture}>
						<ThemedView style={styles.circleContainer}>
							<View style={styles.pointer} />
							<Animated.View
								style={[styles.circle, animatedStyles]}
							>
								<Wheel />
							</Animated.View>
						</ThemedView>
					</GestureDetector>
				</GestureHandlerRootView>
				<ThemedView style={styles.infoBox}>
					{winner ? (
						<ThemedText>Winner: {winner}</ThemedText>
					) : (
						<ThemedText>Spin the wheel to play!</ThemedText>
					)}
				</ThemedView>
			</ThemedView>
		</>
	);
};

const styles = StyleSheet.create({
	rouletteWheelContainer: {
		height: 350,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	text: {
		color: "black",
		fontSize: 16,
	},
	label: {
		position: "absolute",
		alignSelf: "center",
		color: "black",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		width: "100%",
		top: "40%",
	},
	circleRow: { width: "100%", height: "50%", flexDirection: "row" },
	pizza: { width: "50%", height: "100%" },
	pizzaRed: { backgroundColor: "#ce4257" },
	pizzaBlue: { backgroundColor: "#4361ee" },
	pizzaYellow: { backgroundColor: "#fee440" },
	pizzaGreen: { backgroundColor: "#06d6a0" },
	circle: {
		width: 300,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 150,
		borderWidth: 2,
		overflow: "hidden",
		borderColor: "#ced4da",
	},
	circleContainer: {
		width: 300,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
	},
	infoBox: {
		position: "relative",
		flexDirection: "column",
		alignItems: "center",
	},
	pointer: {
		width: 10,
		height: 30,
		backgroundColor: "red",
		position: "absolute",
		top: -15,
		borderWidth: 2,
		borderColor: "black",
		zIndex: 6000,
	},
});

export default RouletteWheel;
