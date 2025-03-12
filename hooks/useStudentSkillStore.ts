import { StudentSkill } from "@/types"
import { create } from "zustand"

type State = {
    studentSkills: StudentSkill[]
    setStudentSkills: (studentSkills: StudentSkill[]) => void
}

export const useStudentSkillStore = create<State>((set) => ({
    studentSkills: [],
    setStudentSkills: (studentSkills) => set({ studentSkills: studentSkills }),
}));