import { useGlobalContext } from '@/providers/AuthProvider';
import { StudentSkill } from '@/types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface Props {
  skills: StudentSkill[] | undefined;
}

export default function ProfileSkills({ skills }: Props) {
  return (
    <View style={styles.container}>
      {skills?.map((skill) => (
        <View key={skill.id} style={styles.skillBadge}>
          <Text style={styles.skillName}>{skill.skillName}</Text>
          <Text style={styles.skillLevel}>{skill.skillLevel}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    marginTop: 2,
    marginBottom: 2
  },
  skillBadge: {
    borderWidth: 2,
    borderColor: "#4CA4CD",
    borderRadius: 30,     
    paddingVertical: 8,   
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
    minWidth: 100,
  },
  skillName: {
    fontFamily: "BeVietnamPro-Bold",
    fontSize: 15,
    color: "#4CA4CD"
  },
  skillLevel: {
    fontFamily: "BeVietnamPro-Regular",
    fontSize: 15,
    color: "#4CA4CD"
  },
});