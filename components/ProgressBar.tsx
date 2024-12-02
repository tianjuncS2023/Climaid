import { StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { ThemedView } from './ThemedView';
import { useXP } from "@/contexts/XPContext";
import { useEffect } from 'react';

export function ProgressBar() {
    const { experience } = useXP();

    // Shared value for the progress width
    const animatedXPWidth = useSharedValue(0);

    // Update the shared value whenever experience changes
    useEffect(() => {
        const targetWidth = experience ? (experience / 3000) * 290 : 0;
        animatedXPWidth.value = withTiming(targetWidth, { duration: 400 }); // Smooth transition
    }, [experience]);

    // Animated style for the progress bar
    const animatedStyle = useAnimatedStyle(() => ({
        width: animatedXPWidth.value,
    }));

    return (
        <ThemedView style={styles.container}>
            <Animated.View style={[styles.bar, animatedStyle]} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        backgroundColor: "grey",
        width: 290,
        marginTop: 5,
        marginBottom: 5,
    },
    bar: {
        height: 20,
        backgroundColor: "#629584",
    },
});
