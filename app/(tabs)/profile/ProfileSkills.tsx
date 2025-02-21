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
    marginTop: 5,
  },
  skillBadge: {
    borderWidth: 3,
    borderColor: "#4CA4CD",
    borderRadius: 40,     
    paddingVertical: 5,   
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 100,        
  },
  skillName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4CA4CD"
  },
  skillLevel: {
    fontSize: 15,
    color: "#4CA4CD"
  },
});