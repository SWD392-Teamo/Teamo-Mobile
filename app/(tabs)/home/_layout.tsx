import { colors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.light.background
      }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="majors/index" />
      <Stack.Screen name="majors/subjects/index" />
    </Stack>
  );
}