import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { addProfileSkill, getProfile } from "@/actions/profileAction";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useSkillStore } from "@/hooks/useSkillStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import queryString from 'query-string';
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";
import { getSkills } from "@/actions/skillAction";
import { Picker } from "@react-native-picker/picker";
import SearchBar from "@/components/SearchBar";
import SkillModalPicker from "@/components/SkillModalPicker";

export default function AddSkillForm() {
  const [isLoading, setLoading] = useState(true);
  const setStudentSkills = useStudentSkillStore((state) => state.setStudentSkills); 

  const {currentUser} = useGlobalContext();

  const setSkills = useSkillStore((state) => state.setData);

  const params = useParamsStore(
      useShallow((state) => ({
        search: state.search
      }))
    );

  const skills = useSkillStore(
        useShallow((state) => state.skills)
    );

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

  const getUrl = () => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...params,
        ...(currentUser? {studentId: currentUser.id} : {}),
      },
    });
  };
  
  useEffect(() => {
    if(currentUser) {
      getSkills(getUrl()).then((response) => {
        setSkills(response);
        setLoading(false);
      });
    }
  }, [currentUser, getSkills]);

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
              <View className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2">
                <View className="mt-3">
                  <Text className="text-primary font-bold font-bregular text-bsm mb-1">Skill</Text>
                  <View className="mb-3"> 
                    <SkillModalPicker control={control} skills={skills} />
                  </View>

                  <Text className="text-primary font-bregular font-bold text-bsm mb-1">Level</Text>
                  <Controller
                    control={control}
                    name="level"
                    rules={{ required: true }}
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