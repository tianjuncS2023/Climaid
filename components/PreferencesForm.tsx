import React, {useContext, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Pressable} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {ThemedText} from "@/components/ThemedText";
import Slider from '@react-native-community/slider';
import {Preferences, usePreferences} from "@/contexts/PreferencesContext";
import { Text } from 'react-native';

import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import {StyleGuide} from '@/constants/StyleGuide';

export default function PreferencesForm() {
    const navigation = useNavigation();
    const { preferences, setPreferences } = usePreferences();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [outdoorsValue, setOutdoorsSliderValue] = useState(5);
    const [indoorsValue, setIndoorsSliderValue] = useState(5);
    const [teamPlayerValue, setTeamPlayerSliderValue] = useState(5);
    const [teamLeaderValue, setTeamLeaderSliderValue] = useState(5);

    const onSubmit = () => {
        let myPreferences: Preferences = {
            indoors: indoorsValue,
            teamPlayers: teamPlayerValue,
            teamLeaders: teamLeaderValue,
            outdoors: outdoorsValue,
        }

        setPreferences(myPreferences);
        console.log(preferences);
        navigation.navigate('preferencesSaved' as never);
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionContainer}>
                <ThemedText type={"defaultSemiBold"}>I prefer socializing outdoors</ThemedText>
                <Controller
                    control={control}
                    name="outdoors"
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={1}
                                value={outdoorsValue}
                                onValueChange={(value) => {
                                    setOutdoorsSliderValue(value);
                                    onChange(value);
                                }}
                            />
                        </View>

                    )}
                />
            </View>

            <View style={styles.sectionContainer}>
                <ThemedText type={"defaultSemiBold"}>I like getting my hands dirty with activities like
                    tree-planting</ThemedText>
                <Controller
                    control={control}
                    name="teamPlayer"
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={1}
                                value={teamPlayerValue}
                                onValueChange={(value) => {
                                    setTeamPlayerSliderValue(value);
                                    onChange(value);
                                }}
                            />
                        </View>

                    )}
                />
            </View>

            <View style={styles.sectionContainer}>
                <ThemedText type={"defaultSemiBold"}>I am great at managing social media groups</ThemedText>
                <Controller
                    control={control}
                    name="indoors"
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={1}
                                value={indoorsValue}
                                onValueChange={(value) => {
                                    setIndoorsSliderValue(value);
                                    onChange(value);
                                }}
                            />
                        </View>

                    )}
                />
            </View>

            <View style={styles.sectionContainer}>
                <ThemedText type={"defaultSemiBold"}>I enjoy organizing people and events</ThemedText>
                <Controller
                    control={control}
                    name="teamLeader"
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={styles.inputContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                step={1}
                                value={teamLeaderValue}
                                onValueChange={(value) => {
                                    setTeamLeaderSliderValue(value);
                                    onChange(value);
                                }}
                            />
                        </View>

                    )}
                />
            </View>

            <Pressable style={StyleGuide.primary_button_1} onPress={onSubmit}>
                <ThemedText style={StyleGuide.button_text}>Save</ThemedText>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    sectionContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    inputContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    slider: {
        paddingTop: 20,
        paddingBottom: 20,
    }
});
