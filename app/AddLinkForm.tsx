import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { addProfileLink, getProfile } from "@/actions/profileAction";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useLinkStore } from "@/hooks/useLinkStore";

export default function AddLinkForm() {
  const [isLoading, setLoading] = useState(true);
  const setLinks = useLinkStore((state) => state.setLinks) 

  const {currentUser} = useGlobalContext();

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onSave(data: FieldValues) {
    if(currentUser) {
      await addProfileLink(currentUser.id, data)
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
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Add new link</Text>
          </View>

            <View className="m-5">
              <InputField 
                title='Name' 
                name='name' 
                control={control}
                showlabel='true'
                rules={{
                    required: 'Link name is required.',
                    pattern: {
                        value: /^[a-zA-Z0-9\s\-_()]+$/,
                        message: 'Invalid link name.'
                    }
              }}/>
              <InputField 
                title='URL' 
                name='url' 
                control={control}
                showlabel='true'
                rules={{
                    required: 'URL is required.',
                    pattern: {
                        value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w@:%_\+.~#?&//=]*)?$/i,
                        message: 'Invalid URL.'
                    }
                }}/>
            </View>
          <View className="items-center m-5">
            <View className='max-w-[500px]'>
              <CustomButton
                title='Save'
                handlePress={handleSubmit(onSave)}
                isLoading={isSubmitting}
                isNotValid={!isValid}
                spinnerColor={colors.light.tint}
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