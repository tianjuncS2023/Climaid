import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { RoleProvider } from "@/contexts/RoleContext";
import { XPProvider } from "@/contexts/XPContext";
import { LevelProvider } from "@/contexts/LevelContext";
import {QuestionProvider} from "@/contexts/QuestionContext";
import {JobProvider} from "@/contexts/JobContext";
import {PreferencesProvider} from "@/contexts/PreferencesContext";
import {EventProvider} from "@/contexts/EventContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QuestionProvider>
      <JobProvider>
      <RoleProvider>
      <PreferencesProvider>
      <EventProvider>
        <XPProvider>
          <LevelProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="role-select" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </LevelProvider>
        </XPProvider>
      </EventProvider>
      </PreferencesProvider>
      </RoleProvider>
      </JobProvider>
      </QuestionProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
