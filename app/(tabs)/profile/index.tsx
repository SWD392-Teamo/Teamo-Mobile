import { getProfile } from '@/actions/profileAction'
import Divider from '@/components/Divider'
import ExternalLink from '@/components/ExternalLink'
import LogoutButton from '@/components/LogoutButton'
import MyApplicationsButton from '@/components/MyApplicationsButton'
import ProfileDetails from '@/app/(tabs)/profile/ProfileDetails'
import ProfileDetailsButton from '@/app/(tabs)/profile/ProfileDetailsButton'
import ProfileImage from '@/app/(tabs)/profile/ProfileImage'
import ProfileNameCard from '@/app/(tabs)/profile/ProfileNameCard'
import Spinner from '@/components/Spinner'
import { colors } from '@/constants/colors'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useGlobalContext } from '@/providers/AuthProvider'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { useShallow } from 'zustand/shallow'
import CustomButton from '@/components/CustomButton'
import ApplicationsListing from './applications'

export default function Profile() {
  const [isLoading, setLoading] = useState(true);

  const {currentUser, isAuthenticated} = useGlobalContext()

  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Get the user profile from the store
  const data = useProfileStore(
    useShallow((state) => (
      state.profile
    ))
  )

  const setData = useProfileStore((state) => state.setData)

  useEffect(() => {
    getProfile(currentUser!.id).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [getProfile])

  const [view, setView] = useState('details');

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
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
             <ProfileDetailsButton />
             <MyApplicationsButton />
             <CustomButton
                title='Details'
                handlePress={() => setView('details')}
                variant={'primary'}
                containerStyles='small'
            />
             <CustomButton
                  title='Applications'
                  handlePress={() => setView('applications')}
                  variant={'primary-outline'}
                  containerStyles='small'
              />
          </View>

          {
            (view == 'details') ? 
            (
              <ProfileDetails profile={data}/>
            ) : (view == 'applications') ? (
              <ApplicationsListing />
            ) : (
              <Text>Random shi</Text>
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
