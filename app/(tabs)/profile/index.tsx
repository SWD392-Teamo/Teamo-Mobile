import { getProfile, uploadImage } from '@/actions/profileAction'
import ProfileDetails from '@/components/profile/ProfileDetails'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileNameCard from '@/components/profile/ProfileNameCard'
import CustomButton from '@/components/CustomButton'
import Divider from '@/components/Divider'
import LogoutButton from '@/components/LogoutButton'
import { useProfileStore } from '@/hooks/useProfileStore'
import { useGlobalContext } from '@/providers/AuthProvider'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native'
import { useShallow } from 'zustand/shallow'
import NotFoundScreen from '@/app/+not-found'
import ApplicationsListing from '@/components/applications/ApplicationsListing'
import { DocumentPickerResponse } from '@react-native-documents/picker'
import convertDocument from '@/utils/DocumentConverter'
import { useLoading } from '@/providers/LoadingProvider'

export default function Profile() {
  const { showLoading, hideLoading } = useLoading();
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
      showLoading();
      getProfile().then((data) => {
        setData(data)
        hideLoading();
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
  
    const res = await uploadImage(formData);
  
    if (res.statusCode == 200) {
      ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
      // Refresh profile data to show new image
      getProfile().then(setData);
    } else {
      ToastAndroid.show("Image upload failed!", ToastAndroid.SHORT);
    }
  }

  const [activeView, setActiveView] = useState('details');

  return (
    <SafeAreaView>
      <ScrollView>
        <View className = 'w-full flex-1 justify-content-start px-5'>  
          <View className='flex flex-row mt-5'>
            <ProfileImage 
              id = {data?.id} 
              imgUrl = {data?.imgUrl} 
              onImageSelect={handleImageUpload}
              allowEdit={true}
            />
            <ProfileNameCard
              id = {data?.id}
              name = {data?.firstName + ' ' + data?.lastName}
              description = {data?.description}
              allowEdit={true}
            />
          </View>

          <Divider />

          <View className='flex flex-row items-center justify-center w-full my-3 px-4 gap-4'>
            <View className='flex-1'> 
              <CustomButton
                title='Details'
                handlePress={() => setActiveView('details')}
                variant={activeView == 'details' ? 'active' : 'inactive'}
                containerStyles='small'
              />
            </View>
            <View className='flex-1'>
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
                allowEdit={true}
              />
            ) : (activeView == 'applications') ? (
              <ApplicationsListing isForUser={true} />
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
