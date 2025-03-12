import { StudentSkill } from "@/types"
import { create } from "zustand"

type State = {
    studentSkills: StudentSkill[]
    selectedStudentSkill: StudentSkill | null
    setSelectedStudentSkill: (studentSkill: StudentSkill) => void
    setStudentSkills: (studentSkills: StudentSkill[]) => void
}

export const useStudentSkillStore = create<State>((set) => ({
    studentSkills: [],
    selectedStudentSkill: null,
    setSelectedStudentSkill: (studentSkill) => set({selectedStudentSkill: studentSkill}),
    setStudentSkills: (studentSkills) => set({ studentSkills: studentSkills }),
}));