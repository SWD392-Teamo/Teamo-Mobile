import { logout } from '@/actions/authActions'
import CustomButton from '@/components/CustomButton'
import { icons } from '@/constants'
import { colors } from '@/constants/colors'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function Profile() {
  const reset = useAuthStore(state => state.reset)

  const router = useRouter();

  // Logout on the server and client
  async function onLogout() {
    await logout();
    reset();
    router.push('/login')
  }

  return (
    <View className='flex flex-row justify-center content-center'>
      <Text className='text-primary text-xl font-pmedium'>Profile</Text>
      <CustomButton
          title='Logout'
          handlePress={onLogout}
          variant='secondary'
          containerStyles='w-full mt-10'
          icon={icons.logout}
          iconColor={colors.dark.icon}
      />
      
    </View>
  )
}
