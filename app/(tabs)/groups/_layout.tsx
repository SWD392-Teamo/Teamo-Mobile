import { colors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function OwnedGroupLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.light.background
      }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]/index" />
      <Stack.Screen name="details/[id]/applications/index" />
    </Stack>
  );
}