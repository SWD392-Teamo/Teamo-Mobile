import { getProfile } from '@/actions/profileAction'
import ProfileDetails from '@/components/ProfileDetails'
import ProfileNameCard from '@/components/ProfileNameCard'
import Spinner from '@/components/Spinner'
import { colors } from '@/constants/colors'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, SafeAreaView } from 'react-native'
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

  return (
    
    <SafeAreaView>
      <Spinner 
        isLoading={loading}
        spinnerColor={colors.light.tint} 
      />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className = 'w-full flex justify-content-start h-full'>  
          <View className='flex flex-row mt-40 ml-10'>
            <Image
                source = {{uri: data?.imgUrl}}
                className = 'max-w-40 max-h-40 rounded-full mr-8 ml-10 mb-8 border-2 border-darkgrey'
                alt = 'Profile'
            />
            <ProfileNameCard
              name = {data?.firstName + ' ' + data?.lastName}
              description = {data?.description}
            />
          </View>

          <View className='flex flex-row mt-10 ml-20 justify-content-start'>
            <ProfileDetails
              code = {data?.code}
              majorCode = {data?.majorCode}
              email = {data?.email}
              gender = {data?.gender}
              dob = {data?.dob}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
