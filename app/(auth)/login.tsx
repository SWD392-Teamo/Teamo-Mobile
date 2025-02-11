import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router';
import React from 'react'
import { Text, View } from 'react-native'

export default function Login() {
  const router = useRouter();

  return (
    <View>
        <Text className='text-primary'>Login</Text>
        <CustomButton
          title="Login"
          handlePress={() => router.push("/majors")}
          variant='primary'
        />
    </View>
  )
}
