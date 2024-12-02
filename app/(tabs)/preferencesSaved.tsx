import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import {useRole} from "@/contexts/RoleContext";
import {Button, Pressable, StyleSheet} from "react-native";
import {PreferencesChart} from "@/components/PreferencesChart";
import {data} from "@remix-run/router";
import {Link} from "expo-router";
import React from "react";
import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function PreferencesSaved (){
    const { role } = useRole();
    const navigation = useNavigation();

    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Preferences Saved!</ThemedText>
            {/*<div style={styles.notice}>*/}
                <ThemedText type={"default"} >Thank you for taking our quiz. Your answers will be used to recommend events that would better suit your contribution style.</ThemedText>
            {/*</div>*/}

            <PreferencesChart></PreferencesChart>


                    <Button title="Change Preferences"  onPress={() => navigation.navigate('takeQuiz' as never)}/>

                    <Button title="Apply Preferences!"  onPress={() => navigation.navigate('events' as never)} />
                {/*</span>*/}
            {/*</div>*/}

        </ThemedView>
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
        flexDirection: "column",
        alignItems: "center",
        gap: 8,

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