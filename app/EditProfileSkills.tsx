import { useGlobalContext } from "@/providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";
import { getProfile } from "@/actions/profileAction";
import CustomButton from "@/components/CustomButton";
import { router, useFocusEffect } from "expo-router";
import EditSkillGuide from "@/components/profile/EditSkillGuide";

export default function EditProfileSkills() {
  const [isLoading, setLoading] = useState(true);

  const {currentUser} = useGlobalContext();

  const studentSkills = useStudentSkillStore(state => state.studentSkills);
  const setStudentSkills = useStudentSkillStore(state => state.setStudentSkills);
        
  const fetchStudentSkills = useCallback(async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const profile = await getProfile(currentUser.id);
          setStudentSkills(profile.studentSkills);
        } catch (error) {
          console.error("Error fetching student skills:", error);
        } finally {
          setLoading(false);
        }
      }
    }, [currentUser, setStudentSkills]);
    
    useEffect(() => {
      fetchStudentSkills();
    }, [fetchStudentSkills]);
    
    useFocusEffect(
      useCallback(() => {
        fetchStudentSkills();
      }, [fetchStudentSkills])
    );

  async function onAddSkillForm() {
    router.push('/AddSkillForm');
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
              <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Skills</Text>
          </View>
          <View className='flex flex-row flex-wrap m-5 mt-1'>
            <View className="w-full">
              {studentSkills?.map((studentSkill) => (
                <EditSkillGuide 
                  key={studentSkill.id}
                  studentSkill={studentSkill}
                />
              ))}
            </View>
          </View>
          <View className="items-center m-5">
            <View className='max-w-[500px]'>
              <CustomButton
                title='Add skill'
                handlePress={() => onAddSkillForm()}
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