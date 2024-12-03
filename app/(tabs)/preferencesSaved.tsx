import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import {useRole} from "@/contexts/RoleContext";
import {Button, Pressable, StyleSheet, View} from "react-native";
import {PreferencesChart} from "@/components/PreferencesChart";
import {data} from "@remix-run/router";
import {Link} from "expo-router";
import React from "react";
import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParallaxScrollView from "../../components/ParallaxScrollView";
import {IconSymbol} from "../../components/ui/IconSymbol";

export default function PreferencesSaved (){
    const { role } = useRole();
    const navigation = useNavigation();

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
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Preferences Saved!</ThemedText>
            </ThemedView>
            <View style={styles.notice}>
                <ThemedText type={"default"} >Thank you for taking our quiz. Your answers will be used to recommend events that would better suit your contribution style.</ThemedText>
            </View>

            <PreferencesChart></PreferencesChart>

            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button title="Change Preferences"  onPress={() => navigation.navigate('takeQuiz' as never)}/>
                </View>
                <View style={styles.button}>
                    <Button title="Apply Preferences!"  onPress={() => navigation.navigate('events' as never)} />
                </View>
            </View>

        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    notice: {
        paddingTop: 30
    },
    button: {
        flex: 1,
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    view: {
        paddingTop: 100,
        paddingBottom: 50,
        paddingLeft: 40,
        paddingRight: 40
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});