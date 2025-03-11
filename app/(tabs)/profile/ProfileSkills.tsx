import { StudentSkill } from '@/types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface Props {
  skills: StudentSkill[] | undefined;
}

export default function ProfileSkills({ skills }: Props) {
  return (
    <View className='flex flex-row flex-wrap gap-4 my-2'>
      {skills?.map((skill) => (
        <View key={skill.id} className='border-2 border-primary p-4 my-6 min-w-[130px] rounded-full'>
          <Text className='font-bbold font-xl text-primary'>{skill.skillName}</Text>
          <Text className='font-bregular font-xl text-primary'>{skill.skillLevel}</Text>
        </View>
      ))}
    </View>
  );
}