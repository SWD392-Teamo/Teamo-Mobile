import { getProfile } from '@/actions/profileAction'
import ProfileDetails from '@/app/(tabs)/profile/ProfileDetails'
import ProfileImage from '@/app/(tabs)/profile/ProfileImage'
import ProfileNameCard from '@/app/(tabs)/profile/ProfileNameCard'
import CustomButton from '@/components/CustomButton'
import Divider from '@/components/Divider'
import LogoutButton from '@/components/LogoutButton'
import Spinner from '@/components/Spinner'
import { colors } from '@/constants/colors'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useGlobalContext } from '@/providers/AuthProvider'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import ApplicationsListing from './applications'
import NotFoundScreen from '@/app/+not-found'

export default function Profile() {
  const [isLoading, setLoading] = useState(true);

  const {currentUser} = useGlobalContext()

  // Get the user profile from the store
  const data = useProfileStore(
    useShallow((state) => (
      state.profile
    ))
  )

  const setData = useProfileStore((state) => state.setData)

  useEffect(() => {
    if (currentUser) {
      getProfile(currentUser.id).then((data) => {
        setData(data)
        setLoading(false)
      })
    }
  }, [getProfile])

  const [activeView, setActiveView] = useState('details');

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />

      <ScrollView>
        <View className = 'w-full flex justify-content-start h-full'>  
          <View className='flex flex-row mt-20 ml-10'>
            <View className='mr-8 ml-10'>
              <ProfileImage imgUrl = {data?.imgUrl}/>
            </View>
            <ProfileNameCard
              name = {data?.firstName + ' ' + data?.lastName}
              description = {data?.description}
            />
          </View>

          <Divider />

          <View className='flex flex-row justify-content-start m-12 justify-evenly'>
             <CustomButton
                title='Details'
                handlePress={() => setActiveView('details')}
                variant={activeView == 'details' ? 'active' : 'inactive'}
                containerStyles='small'
            />
             <CustomButton
                  title='Applications'
                  handlePress={() => setActiveView('applications')}
                  variant={activeView == 'applications' ? 'active' : 'inactive'}
                  containerStyles='small'
              />
          </View>

          {
            (activeView == 'details') ? 
            (
              <ProfileDetails profile={data}/>
            ) : (activeView == 'applications') ? (
              <ApplicationsListing />
            ) : (
              <NotFoundScreen />
            )
          }

          <View className='m-3'>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
