import ProfileDetails from '@/components/profile/ProfileDetails'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileNameCard from '@/components/profile/ProfileNameCard'
import Divider from '@/components/Divider'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useLoading } from '@/providers/LoadingProvider'
import { Profile } from '@/types'
import { getUserProfile } from '@/actions/userAction'
import { AntDesign } from '@expo/vector-icons'
import { DocumentPickerResponse } from '@react-native-documents/picker'
import convertDocument from '@/utils/DocumentConverter'
import { getProfile, uploadImage } from '@/actions/profileAction'
import { useProfileStore } from '@/hooks/useProfileStore'

interface Props {
    isVisible: boolean
    userId: number
    onClose: () => void;
}

export default function ProfileModalForView({isVisible, userId, onClose}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const setData = useProfileStore((state) => state.setData);
  const [profile, setProfile] = useState<Profile>(); 

  async function handleImageUpload(image: DocumentPickerResponse) {
      const formData = new FormData();
    
      // Convert to File
      const imageToUpload = convertDocument(image);
  
      // Create formdata payload with image
      formData.append('image', imageToUpload);
        
      const res = await uploadImage(formData);
    
      if (res.statusCode == 200) {
        ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
        // Refresh profile data to show new image
        getProfile().then(setData);
      } else {
        ToastAndroid.show("Image upload failed!", ToastAndroid.SHORT);
      }
    }

  useEffect(() => {
    showLoading();
    getUserProfile(userId).then((response) => {
        setProfile(response)
        hideLoading();
    })
  }, [getUserProfile])

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View className = 'w-full flex-1 justify-content-start px-5 bg-tertiary'> 
            <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity> 
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={true}
            >
                { profile ? (
                    <>
                    <View className='flex flex-row mt-5'>
                        <ProfileImage 
                            id = {profile.id} 
                            imgUrl = {profile?.imgUrl} 
                            onImageSelect={handleImageUpload}
                            allowEdit={false}
                        />
                        <ProfileNameCard
                            id = {profile.id}
                            name = {profile.firstName + ' ' + profile.lastName}
                            description = {profile?.description}
                            allowEdit={false}
                        />
                    </View>

                    <Divider />

                    <ProfileDetails 
                        profile={profile} 
                        allowEdit={false}
                    />
                </>
                ) : (
                    <View className='flex-1 justify-center items-center'>
                        <Text className="text-center text-primary font-bmedium text-bm">
                            Retrieving user profile...
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    </Modal>
  )
}
