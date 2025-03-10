import "@/global.css";
import AuthProvider from '@/providers/AuthProvider';
import NotificationProvider from "@/providers/NotificationProvider";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import StackNavigator from "./StackNavigator";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "BeVietnamPro-Black": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Black.ttf"),
    "BeVietnamPro-Bold": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Bold.ttf"),
    "BeVietnamPro-ExtraBold": require("../assets/fonts/BeVietnamPro/BeVietnamPro-ExtraBold.ttf"),
    "BeVietnamPro-ExtraLight": require("../assets/fonts/BeVietnamPro/BeVietnamPro-ExtraLight.ttf"),
    "BeVietnamPro-Light": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Light.ttf"),
    "BeVietnamPro-Medium": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Medium.ttf"),
    "BeVietnamPro-Regular": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Regular.ttf"),
    "BeVietnamPro-SemiBold": require("../assets/fonts/BeVietnamPro/BeVietnamPro-SemiBold.ttf"),
    "BeVietnamPro-Thin": require("../assets/fonts/BeVietnamPro/BeVietnamPro-Thin.ttf"),
    "Righteous-Regular": require('../assets/fonts/Righteous/Righteous-Regular.ttf'),
  });

  // Reanimated configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
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
    <NotificationProvider>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NotificationProvider>
  );
}