import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { getProfile, removeProfileLink, updateProfileLink } from "@/actions/profileAction";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useLinkStore } from "@/hooks/useLinkStore";
import { useShallow } from "zustand/shallow";

export default function EditLinkForm() {
  const [isLoading, setLoading] = useState(true);
  const setLinks = useLinkStore((state) => state.setLinks) 

  const {currentUser} = useGlobalContext();

  const { selectedLink } = useLinkStore(
    useShallow((state) => ({
        selectedLink: state.selectedLink
    }))
  );

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onSave(data: FieldValues) {
    if(currentUser && selectedLink) {
      await updateProfileLink(currentUser.id, selectedLink.id, data)
      const updatedProfile = await getProfile(currentUser.id)
      setLinks(updatedProfile.links)
    }
    router.push('/EditProfileLinks')
  }

  async function onRemove() {
    if(currentUser && selectedLink) {
      await removeProfileLink(currentUser.id,selectedLink.id)
      const updatedProfile = await getProfile(currentUser.id)
      setLinks(updatedProfile.links)
    }
    router.push('/EditProfileLinks')
  }

  useEffect(() => {    
    setLoading(false);
  });

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
              <BackButton url="../EditProfileLinks"/>
              <Text className="ml-5 text-bsm font-blight">Links</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update link</Text>
          </View>

            <View className="m-5">
                {selectedLink ? (
                    <>
                    <InputField 
                    title='Name' 
                    name='name' 
                    control={control}
                    placeholder={selectedLink.name}
                    showlabel='true'
                    rules={{
                        pattern: {
                            value: /^[a-zA-Z0-9\s\-_()]+$/,
                            message: 'Invalid link name.'
                        }
                  }}/>
                  <InputField 
                    title='URL' 
                    name='url' 
                    control={control}
                    placeholder={selectedLink.url}
                    showlabel='true'
                    rules={{
                        pattern: {
                            value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w@:%_\+.~#?&//=]*)?$/i,
                            message: 'Invalid URL.'
                        }
                    }}/>
                    </>
                ) : (
                    <Text className="text-gray-600 text-center font-bmedium">No link selected</Text>
                )}
            </View>
          <View className="flex flex-row items-center justify-center w-full px-4 my-3 gap-4">
            <View className='w-[120px]'>
              <CustomButton
                title='Save'
                handlePress={handleSubmit(onSave)}
                isLoading={isSubmitting}
                isNotValid={!isValid}
                variant='active'
                containerStyles='small'
              />
            </View>
            <View className='w-[120px]'>
              <CustomButton
                title='Remove'
                handlePress={onRemove}
                variant='delete'
                containerStyles='small'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}