import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { addProfileSkill, getProfile } from "@/actions/profileAction";
import InputField from "@/components/InputField";
import { FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";

export default function AddSkillForm() {
  const [isLoading, setLoading] = useState(true);
  const setStudentSkills = useStudentSkillStore((state) => state.setStudentSkills);
  const [search, setSearch] = useState<string>("");

  const {currentUser} = useGlobalContext();

  const {control, handleSubmit,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

  async function onSave(data: FieldValues) {
    if(currentUser) {
      await addProfileSkill(currentUser.id, data)
      const updatedProfile = await getProfile(currentUser.id)
      setStudentSkills(updatedProfile.studentSkills)
    }
    router.push('/EditProfileSkills')
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
              <BackButton url="../EditProfileSkills"/>
              <Text className="ml-5 text-bsm font-blight">Skills</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Add new skill</Text>
          </View>

            <View className="m-5">
              
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