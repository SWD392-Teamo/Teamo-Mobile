import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function OnBoarding() {
  const router = useRouter();

  return (
    <View>
        <Text className='text-primary'>
          Hi!!!!!!!
        </Text>
        <CustomButton
            title="Get Started"
            handlePress={() => router.push("/login")}
            variant='primary'
          />
    </View>
  )
}
