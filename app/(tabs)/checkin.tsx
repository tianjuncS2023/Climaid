import { useEffect, useState } from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import for navigation listeners
import { ExperienceMeter } from "@/components/ExperienceMeter";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useXP } from "@/contexts/XPContext";
import { useLevel } from "@/contexts/LevelContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function Checkin() {
	const { experience, setExperience } = useXP();
	const { level, setLevel } = useLevel();
	const [isCheckIn, setIsCheckIn] = useState(false);
	const [isLevelUp, setIsLevelUp] = useState(false);
	const [permission, requestPermission] = useCameraPermissions();
	const navigation = useNavigation();

	// Request permission for the camera

	// Add a listener to reset check-in state when the page is focused
	// useEffect(() => {
	// 	requestPermission();
	// 	const unsubscribe = navigation.addListener("focus", () => {
	// 		setIsCheckIn(false); // Reset check-in state on page load
	// 	});

	// 	// Cleanup listener when the component unmounts
	// 	return unsubscribe;
	// }, [navigation]);

	const handleXP = (increment: number) => {
		const xp = experience;
		if (xp + increment >= 3000) {
			const score = xp + increment - 3000;
			setExperience(score);
			setLevel(level + 1);
			setIsLevelUp(true);
		} else {
			setExperience(xp + increment);
		}
	};

	const isPermissionGranted = Boolean(permission?.granted);

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
			<ThemedView>
				<ThemedView>
					<ThemedText type="title" style={styles.titleContainer}>Check in</ThemedText>
				</ThemedView>

				<ThemedView>
					<ExperienceMeter />
				</ThemedView>
				{isLevelUp && (
					<ThemedView style={{alignItems: "center"}}>
						<ThemedText style={styles.boldedText}>
							Level Up!
						</ThemedText>

						<ThemedText>
							You're now at Level {level}
						</ThemedText>

						<Pressable
							onPress={() => setIsLevelUp(false)}
							style={styles.button}
						>
							<ThemedText style={styles.buttonText}>
								Continue
							</ThemedText>
						</Pressable>
					</ThemedView>
				)}
				{/* Show CameraView only if user hasn't checked in */}
				{isPermissionGranted && !isCheckIn && !isLevelUp && (
					<ThemedView style={styles.cameraContainer}>
						<ThemedText style={styles.cameraGuideText}>
							Scan the Event QR code to check-in and receive
							Experience Points
						</ThemedText>
						<CameraView
							style={styles.qr}
							facing="back"
							onBarcodeScanned={({ data }) => {
								handleXP(400);
								setIsCheckIn(true); // Set check-in state to true once QR is scanned
							}}
						/>
					</ThemedView>
				)}

				{isCheckIn && !isLevelUp && (
					<ThemedView style={{alignItems: "center"}}>
						<ThemedText style={styles.boldedText}>
							Check-in Complete!
						</ThemedText>

						<Image
							source={require("@/assets/images/Check Broken.png")}
							style={styles.image}
						/>

						<ThemedText style={styles.containerText}>
							Click here to be assigned a role!
						</ThemedText>

						<Pressable
							style={styles.button}
							onPress={() => {setIsCheckIn(false); 
								router.replace("/roulette")}}
						>
							<ThemedText style={styles.buttonText}>
								Continue
							</ThemedText>
						</Pressable>
					</ThemedView>
				)}
			</ThemedView>
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
		marginBottom: 16
	},
	image: {
		marginLeft: "auto",
		marginRight: "auto",
	},
	containerText: {
		textAlign: "center",
	},
	boldedText: {
		textAlign: "center",
		fontSize: 24,
		lineHeight: 30,
		fontWeight: "bold",
		color: "#243642",
	},
	button: {
		backgroundColor: "#243642",
		paddingVertical: 12,
		paddingHorizontal: 48,
		borderRadius: 36,
		minWidth: 90,
		alignItems: "center",
		marginTop: 10,
		width: 200,
		marginBottom: 10,
		fontFamily: `-apple - system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans - serif`
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600",
	},
	cameraGuideText: {
		color: "#243642",
		textAlign: "center",
	},
	cameraContainer: {
		borderRadius: 20,
	},
	qr: {
		width: 330,
		height: 300,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: 20,
		borderRadius: 20,
	},
});
