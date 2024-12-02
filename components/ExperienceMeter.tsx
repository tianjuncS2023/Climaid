import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from './ThemedView';
import { ProgressBar } from './ProgressBar';
import { useXP } from '@/contexts/XPContext';
import { useLevel } from '@/contexts/LevelContext';

export function ExperienceMeter() {
  // const rotationAnimation = useSharedValue(0);

  // rotationAnimation.value = withRepeat(
  //   withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
  //   4 // Run the animation 4 times
  // );

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ rotate: `${rotationAnimation.value}deg` }],
  // }));

	const { experience } = useXP()
	const { level } = useLevel()
	
	
  return (
    <ThemedView style={styles.container}>
		<ThemedView style={styles.header}>
			<ThemedText style={styles.text}>
				My Current Level
			</ThemedText>
		</ThemedView>

		<ThemedView style={styles.subContainer}>
			<ThemedText style={styles.levelContainer}>
				  <ThemedText style={styles.subText}>
					  Level {level}
				  </ThemedText>
				  
			</ThemedText>
		
			<ProgressBar>
			</ProgressBar>
			<ThemedText style={styles.subText}>
				{experience} / 3000 Experience Points
			</ThemedText>
		</ThemedView>
	</ThemedView>
  );
}

const styles = StyleSheet.create({
	container:{
		marginBottom: 23,
		marginTop: 15,
		width: 330,
		marginLeft: "auto",
		marginRight: "auto"
	},
	header: {
		backgroundColor: "#387478",
		height: 57,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		zIndex: 2
	},
	levelContainer:{
		display: "flex",
		alignContent: "center",
		width: 700
	},
	text: {
		fontSize: 20,
		lineHeight: 57,
		textAlign: "center",
		color: "#E2F1E7",

	},
	subText: {
		fontSize: 15,
		color: "#243642",
	},
	subContainer: {
		padding: 20,
		paddingTop: 15,
		boxShadow: "0px 3px 15px 1px rgba(0,0,0,0.28)",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	}
});
