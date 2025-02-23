import { useGlobalContext } from "@/providers/AuthProvider";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

export default function StackNavigator() {
  const { isAuthenticated } = useGlobalContext();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!isAuthenticated && protectedRoutes.includes(pathName)) {
      router.push('/login');
    }
  }, [isAuthenticated, router, pathName]);

  if (isAuthenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}