import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { deleteProfileSkill, getProfile, updateProfileSkill } from "@/actions/profileAction";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useShallow } from "zustand/shallow";
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";
import { Picker } from '@react-native-picker/picker';

export default function EditSkillForm() {
  const [isLoading, setLoading] = useState(true);
  const setStudentSkills = useStudentSkillStore((state) => state.setStudentSkills) 

  const {currentUser} = useGlobalContext();

  const { selectedStudentSkill } = useStudentSkillStore(
    useShallow((state) => ({
        selectedStudentSkill: state.selectedStudentSkill
    }))
  );

  const {handleSubmit, control, setValue,
    formState: {isSubmitting, isValid}} = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (selectedStudentSkill) {
          setValue('level', selectedStudentSkill.skillLevel);
        }
        setLoading(false);
      }, [selectedStudentSkill, setValue]);

  async function onSave(data: FieldValues) {
    if(currentUser && selectedStudentSkill) {
      await updateProfileSkill(currentUser.id, selectedStudentSkill.id, data)
      const updatedProfile = await getProfile(currentUser.id)
      setStudentSkills(updatedProfile.studentSkills)
    }
    router.push('/EditProfileSkills')
  }

  async function onDelete() {
    if(currentUser && selectedStudentSkill) {
      await deleteProfileSkill(currentUser.id, selectedStudentSkill.id)
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
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Update skill</Text>
          </View>

            <View className="m-5 mt-1">
                {selectedStudentSkill ? (
                    <>
                    <View className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2">
                        <Text className="text-primary font-bold font-bmedium text-bm">{selectedStudentSkill.skillName} | {selectedStudentSkill.skillType}</Text>
                        <View className="mt-3">
                          <Text className="text-primary font-bregular text-bsm mb-1">Level</Text>
                          <Controller
                            control={control}
                            name="level"
                            rules={{ required: true }}
                            defaultValue={selectedStudentSkill.skillLevel}
                            render={({ field: { onChange, value } }) => (
                              <View className="border-2 border-primaryLight rounded-md overflow-hidden">
                                <Picker
                                  selectedValue={value}
                                  onValueChange={onChange}
                                  style={{ height: 55, width: '100%' }}
                                >
                                  <Picker.Item label="Beginner" value="Beginner" />
                                  <Picker.Item label="PreIntermediate" value="PreIntermediate" />
                                  <Picker.Item label="Intermediate" value="Intermediate" />
                                  <Picker.Item label="Advanced" value="Advanced" />
                                </Picker>
                              </View>
                            )}
                          />
                        </View>
                    </View>

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
                                title='Delete'
                                handlePress={onDelete}
                                variant='delete'
                                containerStyles='small'
                            />
                        </View>
                    </View>
                    </>
                ) : (
                    <Text className="text-gray-600 text-center font-bmedium">No skill selected</Text>
                )}
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}