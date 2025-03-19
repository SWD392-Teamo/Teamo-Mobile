import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { getProfile, removeProfileLink, updateProfileLink } from "@/actions/profileAction";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useLinkStore } from "@/hooks/useLinkStore";
import { useShallow } from "zustand/shallow";
import { useLoading } from "@/providers/LoadingProvider";
import LinkInput from "./LinkInput";

export default function EditLinkForm() {
  const { showLoading, hideLoading } = useLoading();
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
      await updateProfileLink(selectedLink.id, data);
      const updatedProfile = await getProfile();
      setLinks(updatedProfile.links);
    }
    router.push('/profile/EditProfileLinks');
  }

  async function onRemove() {
    if(currentUser && selectedLink) {
      await removeProfileLink(selectedLink.id);
      const updatedProfile = await getProfile();
      setLinks(updatedProfile.links);
    }
    router.push('/profile/EditProfileLinks');
  }

  useEffect(() => {    
    hideLoading();
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="profile/EditProfileLinks"/>
              <Text className="ml-5 text-bsm font-blight">Links</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update link</Text>
          </View>

            <View className="m-5 mt-1">
                {selectedLink ? (
                  <>
                  <InputField 
                    title='Name' 
                    name='name'
                    control={control}
                    multiline={false}
                    showlabel='true'
                    placeholder={selectedLink.name}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^[a-zA-Z0-9\s\-_()]+$/,
                        message: "Invalid link name.",
                      }
                    }}
                  />    
                  <InputField 
                    title='URL' 
                    name='url' 
                    control={control}
                    multiline={false}
                    showlabel='true'
                    placeholder={selectedLink.url}
                    customStyles={{
                      container: "border-2 border-primaryLight rounded-md",
                      label: "text-secondary"
                    }}
                    rules={{
                      pattern: {
                        value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w@:%_\+.~#?&//=]*)?$/i,
                        message: 'Invalid URL.'
                      }
                    }}
                  />

                  <View className="flex flex-row items-center justify-center px-4 m-5 gap-4">
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
                  </>
                ) : (
                    <Text className="text-gray-600 text-center font-bmedium">No link selected</Text>
                )}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}