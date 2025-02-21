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
    marginTop: 10,
    marginLeft: 20,
    flexWrap: "wrap",
  },
  skillBadge: {
    borderWidth: 3,
    borderColor: "#4CA4CD",
    borderRadius: 50,     
    paddingVertical: 10,   
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginBottom: 8,
    minWidth: 100,        
    alignItems: "center"
  },
  skillName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CA4CD"
  },
  skillLevel: {
    fontSize: 15,
    color: "#4CA4CD"
  },
});