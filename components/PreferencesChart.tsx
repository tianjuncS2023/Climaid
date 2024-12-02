import React, {useContext} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import {PreferencesContext, usePreferences} from "@/contexts/PreferencesContext";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";

interface BarChartDataPoint {
    value: number;
    label?: string;
}

export const PreferencesChart: React.FC = () => {
    const preferencesContext = usePreferences();
    const preferences = preferencesContext.preferences;
    const data: BarChartDataPoint[] = [
        { value: preferences.indoors, label: 'Indoors' },
        { value: preferences.outdoors, label: 'Outdoors' },
        { value: preferences.teamLeaders, label: 'Leader' },
        { value: preferences.teamPlayers, label: 'Team Player' },
    ];

    return (
        <View style={styles.chart}>
            <BarChart
                data={data}
                width={Dimensions.get('window').width - 50}
                height={220}
                maxValue={10}
                yAxisThickness={0}
                xAxisThickness={0}
                barWidth={30}
                showYAxisIndices={false}
                showXAxisIndices={false}
                spacing={50}
                initialSpacing={20}
                frontColor={styles.bar.color}
                rulesColor={'#808080'}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bar: {
        color: '#387478'
    }

});