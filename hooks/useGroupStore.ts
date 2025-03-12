import { Group, GroupPosition, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
   groups: Group[]
   totalCount: number
   pageCount: number
   selectedGroup: Group | null
   selectedGroupPosition: GroupPosition | null
}

type Actions = {
   setData: (data: PagedResult<Group>) => void
   setSelectedGroup: (group: Group) => void
   setSelectedGroupPosition: (position: GroupPosition) => void
   appendData: (newSubjects: Group[]) => void
   resetData: () => void
}

const initialState: State = {
   groups: [],
   totalCount: 0,
   pageCount: 0,
   selectedGroup: null,
   selectedGroupPosition: null
}

export const useGroupStore = create<State & Actions>((set) => ({
   ...initialState,

   setData: (data: PagedResult<Group>) => {
      set(() => ({
         groups: data.data,
         totalCount: data.count,
         pageCount: data.pageSize
      }))
   },
   setSelectedGroup: (group: Group) => set(() => ({ selectedGroup: group })),

   setSelectedGroupPosition: (position: GroupPosition) => set(() => ({ selectedGroupPosition: position })),

   appendData: (newGroups: Group[]) => {
           set((state) => ({
               groups: [...state.groups,...newGroups]
           }))
       },
   resetData: () => {
      set(() => ({
         groups: [],
         totalCount: 0,
         pageCount: 0,
         selectedGroupPosition: null
      }))
   }
}))