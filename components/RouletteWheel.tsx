import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Pressable } from "react-native";

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
						style={[styles.label, { transform: "rotate(-135deg)" }]}
					>
						Digging Crew
					</ThemedText>
				</ThemedView>

				<ThemedView style={[styles.pizza, styles.pizzaBlue]}>
					<ThemedText
						style={[styles.label, { transform: "rotate(-45deg)" }]}
					>
						Planting Crew
					</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.circleRow}>
				<ThemedView style={[styles.pizza, styles.pizzaGreen]}>
					<ThemedText
						style={[styles.label, { transform: "rotate(135deg)" }]}
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
	const [group, setGroup] = useState<string | null>(null);

	useEffect(() => {
		if (winner !== null) {
			setTimeout(() => {
				setGroup("A1");
			}, 2000);
		}
	}, [winner]);

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
					let _winner = "";

					const angle = rotation.value % 360;
					if (angle < 91) {
						_winner = "Red";
					} else if (angle < 181) {
						_winner = "Green";
					} else if (angle < 271) {
						_winner = "Yellow";
					} else {
						_winner = "Blue";
					}

					runOnJS(setWinner)(_winner);
				}
			);
		});

	return (
		<>
			{group ? (
				<ThemedView style={styles.container}>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">{winner}</ThemedText>
						<ThemedText type="subtitle">
							See Group {group}
						</ThemedText>
						<Pressable
							style={styles.button}
							onPress={() => router.replace("/events")}
						>
							<ThemedText style={styles.buttonText}>
								Continue
							</ThemedText>
						</Pressable>
					</ThemedView>
				</ThemedView>
			) : (
				<ThemedView style={styles.container}>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">Spin for a Role!</ThemedText>
					</ThemedView>
					<ThemedView style={styles.rouletteContainer}>
						<ThemedView style={styles.rouletteWheelContainer}>
							<GestureHandlerRootView>
								<GestureDetector gesture={gesture}>
									<ThemedView style={styles.circleContainer}>
										<ThemedView style={styles.pointer} />
										<Animated.View
											style={[
												styles.circle,
												animatedStyles,
											]}
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
									<ThemedText>
										Spin the wheel to play!
									</ThemedText>
								)}
							</ThemedView>
						</ThemedView>
					</ThemedView>
				</ThemedView>
			)}
		</>
	);
};

// TODO: move styles to separate location, reuse them

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
	// circleRow: { width: "100%", height: "50%", flexDirection: "row" },
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

	button: {
		backgroundColor: "#0a7ea4",
		paddingVertical: 12,
		paddingHorizontal: 48,
		borderRadius: 8,
		minWidth: 240,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
});

export default RouletteWheel;
