import { getProfile } from '@/actions/profileAction'
import ProfileDetails from '@/components/profile/ProfileDetails'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileNameCard from '@/components/profile/ProfileNameCard'
import CustomButton from '@/components/CustomButton'
import Divider from '@/components/Divider'
import LogoutButton from '@/components/LogoutButton'
import Spinner from '@/components/Spinner'
import { colors } from '@/constants/colors'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useGlobalContext } from '@/providers/AuthProvider'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import NotFoundScreen from '@/app/+not-found'
import ApplicationsListing from './ApplicationsListing'
import { uploadImage } from '@/actions/userActions'
import { DocumentPickerResponse } from '@react-native-documents/picker'
import convertDocument from '@/utils/DocumentConverter'

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

  async function handleImageUpload(image: DocumentPickerResponse) {
    const formData = new FormData();
  
    // Convert to File
    const imageToUpload = convertDocument(image);

    // Create formdata payload with image
    formData.append('image', imageToUpload);
  
    const userId = currentUser?.id!;
  
    const res = await uploadImage(userId, formData);
  
    if (res.statusCode == 200) {
      ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
      // Refresh profile data to show new image
      getProfile(userId).then(setData);
    } else {
      ToastAndroid.show("Image upload failed!", ToastAndroid.SHORT);
    }
  }

  const [activeView, setActiveView] = useState('details');

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />

      <ScrollView>
        <View className = 'w-full flex-1 justify-content-start'>  
          <View className='flex flex-row mt-5 ms-5'>
            <ProfileImage imgUrl = {data?.imgUrl} onImageSelect={handleImageUpload}/>
            <ProfileNameCard
              id = {data?.id}
              name = {data?.firstName + ' ' + data?.lastName}
              description = {data?.description}
            />
          </View>

          <Divider />

          <View className='flex flex-row items-center justify-center w-full px-4 my-3 gap-4'>
            <View className='flex-1 max-w-[160px]'> 
              <CustomButton
                title='Details'
                handlePress={() => setActiveView('details')}
                variant={activeView == 'details' ? 'active' : 'inactive'}
                containerStyles='small'
              />
            </View>
            <View className='flex-1 max-w-[160px]'>
              <CustomButton
                  title='Applications'
                  handlePress={() => setActiveView('applications')}
                  variant={activeView == 'applications' ? 'active' : 'inactive'}
                  containerStyles='small'
              />
            </View>
          </View>

          {
            (activeView == 'details') ? 
            (
              <ProfileDetails 
                profile={data}
              />
            ) : (activeView == 'applications') ? (
              <ApplicationsListing />
            ) : (
              <NotFoundScreen />
            )
          }

            <LogoutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
