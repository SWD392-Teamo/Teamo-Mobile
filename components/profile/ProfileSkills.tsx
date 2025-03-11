import { useGlobalContext } from '@/providers/AuthProvider';
import { StudentSkill } from '@/types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface Props {
  skills: StudentSkill[] | undefined;
}

export default function ProfileSkills({ skills }: Props) {
  return (
    <View className='flex flex-row flex-wrap m-1'>
      {skills?.map((skill) => (
        <View
          className='m-2 p-3 border-2 border-primary rounded-[30px]' 
          key={skill.id}>
          <Text className='text-bsm font-bbold text-primary'>{skill.skillName}</Text>
          <Text className='text-bsm font-bregular text-primary'>{skill.skillLevel}</Text>
        </View>
      ))}
    </View>
  );
}