import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import { addProfileSkills, getProfile } from "@/actions/profileAction";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import { useSkillStore } from "@/hooks/useSkillStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import queryString from 'query-string';
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";
import { getSkills } from "@/actions/skillAction";
import { Picker } from "@react-native-picker/picker";
import SkillModalPicker from "@/components/SkillModalPicker";
import { StudentSkillToAdd } from "@/types";
import { useLoading } from "@/providers/LoadingProvider";
import { AntDesign } from "@expo/vector-icons";

export default function AddSkillForm() {
  const { showLoading, hideLoading } = useLoading();
  const setStudentSkills = useStudentSkillStore((state) => state.setStudentSkills); 
  const [selectedSkills, setSelectedSkills] = useState<StudentSkillToAdd[]>([
    { skillId: 0, level: "Beginner" }
  ]);

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

  async function onSave() {
    if(currentUser && selectedSkills.length > 0) {
      const validSkills = selectedSkills.filter(skill => skill.skillId !== 0);
    
      if (validSkills.length === 0) {
        // Handle case where no valid skills were selected
        alert("Please select at least one skill");
        return;
      }
      showLoading();
      await addProfileSkills(validSkills);
      const updatedProfile = await getProfile();
      hideLoading();
      setStudentSkills(updatedProfile.studentSkills);
    }
    router.push('/profile/EditProfileSkills');
  }

  const getUrl = () => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...params,
        ...(currentUser? {studentId: currentUser.id} : {}),
        ...{isPaginated: false}
      },
    });
  };
  
  useEffect(() => {
    if(currentUser) {
      showLoading();
      getSkills(getUrl()).then((response) => {
        setSkills(response);
        hideLoading();
      });
    }
  }, [currentUser, getSkills]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='w-full flex justify-content-center'>  
            
          <View className="m-5 ml-5">
            <View className="flex flex-row justify-content-start mt-2">
              <BackButton url="profile/EditProfileSkills"/>
              <Text className="ml-5 text-bsm font-blight">Skills</Text>
            </View >
            <Text className="m-2 mr-5 text-bm text-secondary font-bsemibold">Add new skills</Text>
          </View>

          <View className="m-5">
            {selectedSkills.map((skill, index) => (
              <View
                key={index}
                className="w-full bg-white border-2 border-primary p-4 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2"
              >
                <Text className="text-primary font-bold font-bregular text-bsm mb-1">Skill</Text>
                <SkillModalPicker
                  control={control}
                  skills={skills}
                  name={`skill-${index}`}
                  initialValue={skill.skillId}
                  onSelectSkill={(skillId) => {
                    const updatedSkills = [...selectedSkills];
                    updatedSkills[index].skillId = skillId;
                    setSelectedSkills(updatedSkills);
                  }}
                />

                <Text className="text-primary font-bregular font-bold text-bsm mb-1 mt-3">Level</Text>
                <Controller
                  control={control}
                  name={`level-${index}`}
                  defaultValue={skill.level}
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <View className="border-2 border-primaryLight rounded-md overflow-hidden">
                      <Picker
                        selectedValue={value}
                        onValueChange={(val) => {
                          const updatedSkills = [...selectedSkills];
                          updatedSkills[index].level = val;
                          setSelectedSkills(updatedSkills);
                        }}
                        style={{ height: 55, width: "100%" }}
                        mode="dropdown"
                      >
                        <Picker.Item label="Beginner" value="Beginner" />
                        <Picker.Item label="PreIntermediate" value="PreIntermediate" />
                        <Picker.Item label="Intermediate" value="Intermediate" />
                        <Picker.Item label="Advanced" value="Advanced" />
                      </Picker>
                    </View>
                  )}
                />

                {/* Remove Skill Button */}
                  <TouchableOpacity
                    onPress={() => setSelectedSkills(selectedSkills.filter((_, i) => i !== index))}
                    className="mt-3 bg-softgrey p-2 rounded-md"
                  >
                    <Text className="text-red text-center">Remove</Text>
                  </TouchableOpacity>
              </View>
            ))}

            {/* Add Skill Button */}
            <TouchableOpacity
              onPress={() => setSelectedSkills([...selectedSkills, { skillId: 0, level: "Beginner" }])}
              className="bg-tertiary p-3 rounded-md flex flex-row justify-center items-center mt-3 border-2 border-primaryLight"
            >
              <AntDesign name="plus" size={20} color="#4CA4CD" />
              <Text className="text-primary text-center">Add Skill</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center m-5">
            <View className="max-w-[500px]">
              <CustomButton
                title="Save"
                handlePress={handleSubmit(onSave)}
                isLoading={isSubmitting}
                isNotValid={!isValid}
                spinnerColor={colors.light.tint}
                variant="active"
                containerStyles="small"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}