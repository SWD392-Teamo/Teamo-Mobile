import { Group, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    groups: Group[]
    totalCount: number
    selectedGroup: Group | null
}

type Actions = {
    setData: (data: PagedResult<Group>) => void
    setSelectedGroup: (group: Group) => void     
    appendData: (newGroups: Group[]) => void
}

const initialState: State = {
    groups: [],
    totalCount: 0,
    selectedGroup: null
}

export const useGroupStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Group>) => {
        set(() => ({
            groups: data.data,
            totalCount: data.count
        }))
    },

    setSelectedGroup: (group: Group) => {
        set(() => ({
            selectedGroup: group
        }))
    },

    appendData: (newGroups: Group[]) => {
        set((state) => ({
            groups: [...state.groups,...newGroups]
        }))
    }
}))