import { useGlobalContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import { colors } from "@/constants/colors";
import { ScrollView, View, Text } from "react-native";
import BackButton from "@/components/BackButton";
import ProfileSkills from "@/components/profile/ProfileSkills";
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore";
import { useProfileStore } from "@/hooks/useProfileStore";
import { getProfile } from "@/actions/profileAction";
import CustomButton from "@/components/CustomButton";

export default function EditProfileSkills() {
  const [isLoading, setLoading] = useState(true);

  const {currentUser} = useGlobalContext();

  const studentSkills = useProfileStore(
    useShallow((state) => (
      state.profile?.studentSkills
    ))
  )
    
  const setStudentSkills = useStudentSkillStore((state) => state.setStudentSkills)
    
  useEffect(() => {
    if (currentUser) {
      getProfile(currentUser.id).then((profile) => {
        setStudentSkills(profile.studentSkills)
        setLoading(false)
      })
    }
  }, [getProfile])

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
            <ProfileSkills skills={studentSkills}/>
          </View>
          <View className="items-center m-5">
            <View className='max-w-[500px]'>
              <CustomButton
                title='Add skill'
                handlePress={() => ({})}
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