import { icons } from "@/constants"
import { colors } from "@/constants/colors"
import { useStudentSkillStore } from "@/hooks/useStudentSkillStore"
import { StudentSkill } from "@/types"
import { router } from "expo-router"
import React from "react"
import { Text, TouchableOpacity, Image, View } from "react-native"

type Props = {
  studentSkill: StudentSkill 
}

export default function EditSkillGuide({ studentSkill }: Props) {
  const setSelectedStudentSkill = useStudentSkillStore(state => state.setSelectedStudentSkill);
    
  const handlePress = () => {
    setSelectedStudentSkill(studentSkill);
    router.push('/profile/EditSkillForm');
  };

  return (
    <TouchableOpacity 
      className="w-full bg-white border-2 border-primaryLight p-3 my-2 rounded-lg shadow shadow-primaryLight/10 elevation-2"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex flex-row items-center w-full">
        <View className="mr-3">
          <Image 
            className="w-5 h-5"
            source={icons.shieldCheck}  
            tintColor={colors.light.tint}
          />
        </View>
        <View>
          <View>
            <Text className="text-primary font-bregular text-bsm font-bold">{studentSkill.skillName} | {studentSkill.skillType}</Text>
          </View>
          <Text  className="font-bregular text-primary text-bxsm">{studentSkill.skillLevel}</Text>
        </View>
        <TouchableOpacity className="ml-auto">
          <Image 
            className="w-5 h-5"
            source={icons.edit}
            tintColor={colors.light.tint}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}