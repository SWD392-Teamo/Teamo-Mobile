import { useGlobalContext } from "@/providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { router, useFocusEffect } from "expo-router";
import { getProfile } from "@/actions/profileAction";
import { useLinkStore } from "@/hooks/useLinkStore";
import EditLinkGuide from "@/components/EditLinkGuide";

export default function EditProfileLinks() {
  const [isLoading, setLoading] = useState(true);

  const { currentUser } = useGlobalContext();
  
  const links = useLinkStore(state => state.links);
  const setLinks = useLinkStore(state => state.setLinks);
  
  const fetchLinks = useCallback(async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const profile = await getProfile(currentUser.id);
        setLinks(profile.links);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
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
    router.push('/AddLinkForm');
  }

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
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
                title='Add new link'
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