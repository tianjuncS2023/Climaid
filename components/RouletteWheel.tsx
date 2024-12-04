import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Pressable } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleGuide } from "@/constants/StyleGuide";

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

const groupLabels = [
	"Planting Crew",
	"Cleanup Crew",
	"Beverage Crew",
	"Digging Crew",
];

const Wheel = () => {
	return (
		<>
			<ThemedView style={styles.circleRow}>
				<ThemedView style={[styles.pizza, styles.pizza1]}>
					<ThemedText
						style={[
							labelStyles[0],
							StyleGuide.button_text,
							// { transform: "rotate(-135deg)" },
						]}
					>
						{groupLabels[0]}
					</ThemedText>
				</ThemedView>

				<ThemedView style={[styles.pizza, styles.pizza2]}>
					<ThemedText
						style={[
							labelStyles[1],
							StyleGuide.button_text_dark,
							// { transform: "rotate(-45deg)" },
						]}
					>
						{groupLabels[1]}
					</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.circleRow}>
				<ThemedView style={[styles.pizza, styles.pizza3]}>
					<ThemedText
						style={[
							labelStyles[2],
							StyleGuide.button_text,
							// { transform: "rotate(135deg)" },
						]}
					>
						{groupLabels[2]}
					</ThemedText>
				</ThemedView>
				<ThemedView style={[styles.pizza, styles.pizza4]}>
					<ThemedText
						style={[
							labelStyles[3],
							StyleGuide.button_text,
							// { transform: "rotateZ(45deg)" },
						]}
					>
						{groupLabels[3]}
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

	let lastUpdate = Date.now();

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ rotateZ: `${rotation.value}deg` }],
		};
	});

	const gesture = Gesture.Pan()
		.onUpdate((e) => {
			if (hasSpun) return;

			// Throttle updates to ~60fps, necessary for app stability
			const now = Date.now();
			if (now - lastUpdate > 16) {
				const clampedVelocity = Math.max(
					-5000,
					Math.min(5000, e.velocityY)
				);
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
						_winner = groupLabels[0];
					} else if (angle < 181) {
						_winner = groupLabels[2];
					} else if (angle < 271) {
						_winner = groupLabels[3];
					} else {
						_winner = groupLabels[1];
					}

					runOnJS(setWinner)(_winner);
				}
			);
		});

	return (
		<>
			{group ? (
				<ThemedView style={styles.pageContainer}>
					<ThemedView style={styles.titleContainer}>
						<ThemedText type="title">You are assigned:</ThemedText>
						<ThemedView style={StyleGuide.secondary_button_2}>
							<ThemedText
								type="subtitle"
								style={[
									StyleGuide.button_text_dark,
									{ fontSize: 30 },
								]}
							>
								{winner}
							</ThemedText>
							<ThemedText
								type="subtitle"
								style={[
									StyleGuide.button_text_dark,
									{ fontSize: 76 },
								]}
							>
								{group}
							</ThemedText>
						</ThemedView>
						<ThemedText style={[StyleGuide.button_text_dark]}>
							Find your group!
						</ThemedText>
						<Pressable
							style={StyleGuide.primary_button_2}
							onPress={() => {
								setGroup(null);
								setWinner(null);
								rotation.value = 0;
								setHasSpun(false);
								router.replace("/events");
							}}
						>
							<ThemedText style={StyleGuide.button_text}>
								Continue
							</ThemedText>
						</Pressable>
					</ThemedView>
				</ThemedView>
			) : (
				<ThemedView style={styles.pageContainer}>
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
									<ThemedText
										type="subtitle"
										style={[
											StyleGuide.button_text_dark,
											{ fontSize: 20 },
										]}
									>
										Winner: {winner}!
									</ThemedText>
								) : (
									<ThemedText type="subtitle">
										{/* Spin the wheel to play! */}
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

const styles = StyleSheet.create({
	rouletteWheelContainer: {
		height: 350,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},

	label0: {
		position: "absolute",
		alignSelf: "center",
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "right",
		justifyContent: "center",
		width: "60%",
		bottom: "15%",
		right: "15%",
	},

	label1: {
		position: "absolute",
		alignSelf: "center",
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left",
		justifyContent: "center",
		width: "60%",
		bottom: "15%",
		left: "15%",
	},

	label2: {
		position: "absolute",
		alignSelf: "center",
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "right",
		justifyContent: "center",
		width: "70%",
		top: "15%",
		right: "15%",
	},

	label3: {
		position: "absolute",
		alignSelf: "center",
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left",
		justifyContent: "center",
		width: "70%",
		top: "15%",
		left: "15%",
	},

	circleRow: { width: "100%", height: "50%", flexDirection: "row" },

	pizza: { width: "50%", height: "100%" },

	pizza1: { backgroundColor: "#243642" },
	pizza2: { backgroundColor: "#E2F1E7" },
	pizza3: { backgroundColor: "#387478" },
	pizza4: { backgroundColor: "#629584" },

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
	pageContainer: {
		flex: 1,
		alignItems: "center",
		gap: 40,
	},
	titleContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 120,
		gap: 20,
	},
});

const labelStyles = [
	styles.label0,
	styles.label1,
	styles.label2,
	styles.label3,
];

export default RouletteWheel;
