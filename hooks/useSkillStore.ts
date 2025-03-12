import { Skill } from "@/types"
import { create } from "zustand"

type State = {
    skills: Skill[]
    selectedskill: Skill | null
}

type Actions = {
    setData: (data: Skill[]) => void
    setSelectedskill: (skill: Skill) => void     
}

const initialState: State = {
    skills: [],
    selectedskill: null
}

export const useSkillStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: Skill[]) => {
        set(() => ({
            skills: data
        }))
    },

    setSelectedskill: (skill: Skill) => {
        set(() => ({
            selectedskill: skill
        }))
    }

}))