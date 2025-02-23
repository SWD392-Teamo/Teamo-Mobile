import { Major, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    majors: Major[]
    totalCount: number
    selectedMajor: Major | null
}

type Actions = {
    setData: (data: PagedResult<Major>) => void
    setSelectedMajor: (major: Major) => void
}

const initialState: State = {
    majors: [],
    totalCount: 0,
    selectedMajor: null
}

export const useMajorStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Major>) => {
        set(() => ({
            majors: data.data,
            totalCount: data.count,
        }))
    },

    setSelectedMajor: (major: Major) => {
        set(() => ({
            selectedMajor: major, 
        }));
    },
}))