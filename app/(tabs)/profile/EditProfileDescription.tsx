import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, ToastAndroid } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { getProfile, updateProfileDescription } from "@/actions/profileAction";
import { useLoading } from "@/providers/LoadingProvider";
import { FieldValues, useForm } from "react-hook-form";
import { useProfileStore } from "@/hooks/useProfileStore";
import { useShallow } from "zustand/shallow";
import InputField from "@/components/InputField";

export default function EditProfileDescription() {
  const {showLoading, hideLoading} = useLoading();

  const profile = useProfileStore(
    useShallow((state) => state.profile)
  )

  const setProfile = useProfileStore((state) => state.setData);

  const {control, handleSubmit, reset,
      formState: {isSubmitting, isValid}} = useForm({
          mode: 'onTouched'
      });

  async function onSave(data: FieldValues) {
    try {
      showLoading();
      const res = await updateProfileDescription(data);   
      if(res.error == undefined) {
        const updatedProfile = await getProfile();
        hideLoading();
        ToastAndroid.show('Updated profile description successfully.', ToastAndroid.SHORT);
        setProfile(updatedProfile);
        router.push('/(tabs)/profile');
      } else if(res.statusCode) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  useEffect(() => {
    if (profile) {
      reset({
        description: profile.description,
      });
    }
  }, [profile, reset]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="(tabs)/profile"/>
              <Text className="ml-5 text-bsm font-blight">Profile</Text>
            </View >
            <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Description</Text>
            <Text className="m-2 mt-0.5 mr-5 text-bsm text-gray-600 font-bregular">Tell others about yourself.</Text>
          </View>
          <View className='flex flex-row flex-wrap m-5 mt-1'>
            <View className="w-full">
              <InputField
                title='Description' 
                name='description' 
                control={control}
                multiline={true}
                rows={5}
                showlabel='false'
              />
            </View>
          </View>
          <View className="items-center m-5">
            <View className='max-w-[500px]'>
              <CustomButton
                title='Save'
                handlePress={handleSubmit(onSave)}
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