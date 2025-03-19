import { useGlobalContext } from "@/providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { router, useFocusEffect } from "expo-router";
import { getProfile } from "@/actions/profileAction";
import { useLinkStore } from "@/hooks/useLinkStore";
import EditLinkGuide from "@/app/(tabs)/profile/EditLinkGuide";
import { useLoading } from "@/providers/LoadingProvider";

export default function EditProfileLinks() {
  const { showLoading, hideLoading } = useLoading();

  const { currentUser } = useGlobalContext();
  
  const links = useLinkStore(state => state.links);
  const setLinks = useLinkStore(state => state.setLinks);
  
  const fetchLinks = useCallback(async () => {
    if (currentUser) {
      showLoading();
      try {
        const profile = await getProfile();
        setLinks(profile.links);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        hideLoading();
      }
    }
  }, [currentUser, setLinks]);
  
  // Fetch links when component mounts
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  
  // Refresh links when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchLinks();
    }, [fetchLinks])
  );

  async function onAddLinkForm() {
    router.push('/profile/AddLinkForm');
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="(tabs)/profile"/>
              <Text className="ml-5 text-bsm font-blight">Profile</Text>
            </View >
            <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Links</Text>
          </View>
          <View className='flex flex-row flex-wrap m-5 mt-1'>
            <View className="w-full">
              {links?.map((link) => (
                <EditLinkGuide 
                  key={link.id}
                  link={link}
                />
              ))}
            </View>
          </View>
          <View className="items-center m-5">
            <View className='max-w-[500px]'>
              <CustomButton
                title='Add links'
                handlePress={() => onAddLinkForm()}
                variant='active'
                containerStyles='small'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}