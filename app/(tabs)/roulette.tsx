import { useState, useRef, useCallback } from "react";
import {
	TouchableOpacity,
	Modal,
	findNodeHandle,
	UIManager,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import RouletteWheel from "@/components/RouletteWheel";
import PointerArrowDiagram from "@/components/PointerArrowDiagram";
import { StyleSheet } from "react-native";

export default function Roulette() {
	const [showCoachMark, setShowCoachMark] = useState(true);
	const [highlightPosition, setHighlightPosition] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	const rouletteRef = useRef(null);

	// Consolidated measurement logic
	const measureRouletteWheel = useCallback(() => {
		if (rouletteRef.current) {
			const handle = findNodeHandle(rouletteRef.current);
			UIManager.measure(
				handle ?? 0,
				(x, y, width, height, pageX, pageY) => {
					setHighlightPosition({
						top: pageY,
						left: pageX,
						width,
						height,
					});
				}
			);
		}
	}, []);

	return (
		<ThemedView style={styles.container}>
			<ThemedView
				onLayout={measureRouletteWheel}
				style={styles.rouletteContainer}
			>
				<RouletteWheel />
			</ThemedView>
			{showCoachMark && (
				<Modal visible={showCoachMark} transparent animationType="fade">
					<ThemedView style={styles.overlay}>
						<ThemedView
							style={[
								styles.highlight,
								{
									top: highlightPosition.top,
									left: highlightPosition.left,
									width: highlightPosition.width,
									height: highlightPosition.height,
								},
							]}
						/>
						<ThemedView
							style={[
								styles.instructionBox,
								{
									bottom: 160,
									left: 0,
									right: 0,
								},
							]}
						>
							{/* <PointerArrowDiagram /> */}
							<ThemedView
								style={{
									backgroundColor: "transparent",
									paddingLeft: 120,
								}}
							>
								<PointerArrowDiagram />
							</ThemedView>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setShowCoachMark(false)}
							>
								<ThemedText style={styles.closeButtonText}>
									Got it!
								</ThemedText>
							</TouchableOpacity>
						</ThemedView>
					</ThemedView>
				</Modal>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	rouletteContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	highlight: {
		position: "absolute",
		borderWidth: 3,
		borderColor: "white",
		borderRadius: 10,
		backgroundColor: "transparent",
	},
	instructionBox: {
		position: "absolute",
		backgroundColor: "transparent",
		padding: 10,
		alignItems: "center",
	},
	closeButton: {
		marginTop: 10,
		backgroundColor: "#007BFF",
		padding: 10,
		borderRadius: 5,
		width: 150, // Fixed width to make it more centered
		alignSelf: "center", // Ensure button is centered within its parent
	},
	closeButtonText: {
		color: "white",
		textAlign: "center",
	},
});
