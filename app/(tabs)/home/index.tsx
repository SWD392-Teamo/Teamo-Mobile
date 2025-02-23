import LogoutButton from '@/components/LogoutButton'
import React from 'react'
import { Text, View } from 'react-native'

export default function HomeLanding() {
  return (
    <View className='flex justify-center items-center'>
      <Text className='text-primary text-xl font-bmedium'>Home</Text>

      <View className='mt-10'>
        <LogoutButton />
      </View>
    </View>
  )
}
