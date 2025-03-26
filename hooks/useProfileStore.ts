import { Profile } from "@/types"
import { create } from "zustand"

type State = {
    profile: Profile | null
}

type Actions = {
    setData: (data: Profile) => void
}

const initialState: State = {
    profile: null
} 

export const useProfileStore = create<State & Actions>() ((set) => ({
    ...initialState,

    setData: (data: Profile) => {
        set(() => ({
            profile: data
        }))
    }
}))