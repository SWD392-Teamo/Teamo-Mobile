import "@/global.css";
import requestUserPermission from "@/lib/getUserPermission";
import AuthProvider, { useGlobalContext } from '@/providers/AuthProvider';
import { protectedRoutes } from '@/routes/protectedRoutes';
import { getMessaging } from "@react-native-firebase/messaging";
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
  
  const {isAuthenticated} = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();

  const getToken = async () => {
    const token = await getMessaging().getToken();
    console.log(token);
  }


  useEffect(() => {
    requestUserPermission();
    getToken();
    if (loaded) {
      SplashScreen.hideAsync();
    }
    if (!isAuthenticated && protectedRoutes.includes(pathName)) {
      router.push('/login');
    }
  }, [loaded, isAuthenticated, router]);

  if (!loaded) {
    return null;
  }



  return (
    <AuthProvider>
      {isAuthenticated ? (    
        <Stack screenOptions={{ headerShown: false }}>
          {/* Protected Routes */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          {/* Unprotected Routes */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </AuthProvider>
  );
}
