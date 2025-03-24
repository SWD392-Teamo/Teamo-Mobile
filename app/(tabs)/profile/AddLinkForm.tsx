import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { addProfileLinks, getProfile } from "@/actions/profileAction";
import { useFieldArray, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useLinkStore } from "@/hooks/useLinkStore";
import { useLoading } from "@/providers/LoadingProvider";
import { AntDesign } from "@expo/vector-icons";
import LinkInput from "./LinkInput";

export default function AddLinkForm() {
  const { showLoading, hideLoading } = useLoading();
  const setLinks = useLinkStore((state) => state.setLinks);
  

  const {currentUser} = useGlobalContext();

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched',
        defaultValues: {
          links: [{ name: "", url: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "links", 
    });

  async function onSave(data: any) {
    if(currentUser && data.links.length > 0) {
      showLoading();
      await addProfileLinks(data.links);
      const updatedProfile = await getProfile();
      hideLoading();
      setLinks(updatedProfile.links);
    }
    router.push('/profile/EditProfileLinks');
  }

  useEffect(() => {    
    hideLoading();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  

          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="profile/EditProfileLinks"/>
              <Text className="ml-5 text-bsm font-blight">Links</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Add new links</Text>
          </View>

            <View className="m-5">
            {fields.map((item, index) => (
              <View key={item.id} className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2">
                <LinkInput 
                  control={control} 
                  index={index} 
                />

                {/* Remove Link Button */}
                <TouchableOpacity
                  onPress={() => remove(index)}
                  className="mt-3 bg-softgrey p-2 rounded-md"
                >
                  <Text className="text-red text-center">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

              {/* Add Link Button */}
              <TouchableOpacity
                onPress={() => append({ name: "", url: "" })}
                className="bg-tertiary p-3 rounded-md flex flex-row justify-center items-center mt-3 border-2 border-primaryLight"
              >
                <AntDesign name="plus" size={20} color="#4CA4CD" />
                <Text className="text-primary text-center">Add Link</Text>
              </TouchableOpacity>
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