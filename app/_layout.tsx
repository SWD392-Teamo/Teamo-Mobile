import "@/global.css";
import AuthProvider, { useGlobalContext } from '@/providers/AuthProvider';
import { protectedRoutes } from '@/routes/protectedRoutes';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Righteous-Regular": require('../assets/fonts/Righteous/Righteous-Regular.ttf'),
  });
  
  const {isAuthenticated} = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();
  
  useEffect(() => {
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
