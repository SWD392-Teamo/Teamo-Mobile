import { getProfile } from '@/actions/profileAction'
import CustomButton from '@/components/CustomButton'
import Loading from '@/components/Loading'
import ProfileNameCard from '@/components/ProfileNameCard'
import { icons } from '@/constants'
import { colors } from '@/constants/colors'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow'

export default function Profile() {
  const reset = useAuthStore(state => state.reset)

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const data = useProfileStore(
    useShallow((state) => (
      state.profile
    ))
  )

  const setData = useProfileStore((state) => state.setData)

  useEffect(() => {
    getProfile().then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [getProfile])

if(loading) return;

  return (
    <View className='flex flex-row justify-center content-center'>

      <View className='flex flex-row justify-content-start'>
      <ProfileNameCard
        name = {data?.firstName + ' ' + data?.lastName}
        description = {data?.description}
      />
      </View>
      
    </View>
  )
}
