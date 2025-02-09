import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../styles/main.scss";

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Epilogue-Black": require("../assets/fonts/Epilogue/Epilogue-Black.ttf"),
    "Epilogue-Bold": require("../assets/fonts/Epilogue/Epilogue-Bold.ttf"),
    "Epilogue-ExtraBold": require("../assets/fonts/Epilogue/Epilogue-ExtraBold.ttf"),
    "Epilogue-ExtraLight": require("../assets/fonts/Epilogue/Epilogue-ExtraLight.ttf"),
    "Epilogue-Light": require("../assets/fonts/Epilogue/Epilogue-Light.ttf"),
    "Epilogue-Medium": require("../assets/fonts/Epilogue/Epilogue-Medium.ttf"),
    "Epilogue-Regular": require("../assets/fonts/Epilogue/Epilogue-Regular.ttf"),
    "Epilogue-SemiBold": require("../assets/fonts/Epilogue/Epilogue-SemiBold.ttf"),
    "Epilogue-Thin": require("../assets/fonts/Epilogue/Epilogue-Thin.ttf"),
    "ClashDisplay": require('../assets/fonts/ClashDisplay.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
