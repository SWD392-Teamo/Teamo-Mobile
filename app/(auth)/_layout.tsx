import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
    </Stack>
  )
}
