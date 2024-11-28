import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
			<View style={styles.circleRow}>
				<View style={[styles.pizza, styles.pizzaRed]}>
					<Text
						style={[
							styles.label,
							{ transform: [{ rotateZ: "-135deg" }] },
						]}
					>
						Red
					</Text>
				</View>
				<View style={[styles.pizza, styles.pizzaBlue]}>
					<Text
						style={[
							styles.label,
							{ transform: [{ rotateZ: "-45deg" }] },
						]}
					>
						Blue
					</Text>
				</View>
			</View>
			<View style={styles.circleRow}>
				<View style={[styles.pizza, styles.pizzaGreen]}>
					<Text
						style={[
							styles.label,
							{ transform: [{ rotateZ: "135deg" }] },
						]}
					>
						Green
					</Text>
				</View>
				<View style={[styles.pizza, styles.pizzaYellow]}>
					<Text
						style={[
							styles.label,
							{ transform: [{ rotateZ: "45deg" }] },
						]}
					>
						Yellow
					</Text>
				</View>
			</View>
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

	const determineWinner = (angle: number) => {
		// Determine which quadrant the pointer lands on
		if (angle < 91) return "Red";
		if (angle < 181) return "Green";
		if (angle < 271) return "Yellow";
		return "Blue";
	};

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
				(isFinished) => {
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
		<SafeAreaView style={styles.container}>
			<GestureHandlerRootView>
				<GestureDetector gesture={gesture}>
					<View style={styles.circleContainer}>
						<View style={styles.pointer} />
						<Animated.View style={[styles.circle, animatedStyles]}>
							<Wheel />
						</Animated.View>
					</View>
				</GestureDetector>
			</GestureHandlerRootView>
			{winner ? (
				<View style={styles.infoBox}>
					<Text style={styles.text}>Winner: {winner}!</Text>
				</View>
			) : (
				<View style={styles.infoBox}>
					<Text style={styles.text}>Spin the wheel to play!</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
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
	infoBox: {
		marginTop: 15,
		height: 40,
		justifyContent: "space-between",
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
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	circleContainer: {
		width: 300,
		height: 300,
		justifyContent: "center",
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
