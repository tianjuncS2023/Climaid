import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="preferencesSaved"
				options={{
					href: null,
					title: "PreferencesSaved",
				}}
			/>
			<Tabs.Screen
				name="create_events"
				options={{
					href: null,
					title: "Create Events",
				}}
			/>
			<Tabs.Screen
				name="roulette"
				options={{
					href: null,
					title: "Spin The Wheel",
				}}
			/>
			<Tabs.Screen
				name="events"
				options={{
					title: "Events",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"calendar" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="jobs"
				options={{
					title: "Jobs",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"briefcase.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="checkin"
				options={{
					title: "Check-in",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"checkmark.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"person.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="addquestion"
				options={{
					href: null,
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"person.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="addrole"
				options={{
					href: null,
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"person.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="editquiz"
				options={{
					href: null,
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"person.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="takeQuiz"
				options={{
					href: null,
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name={"person.circle.fill" as IconSymbolName}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
