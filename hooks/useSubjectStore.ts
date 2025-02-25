import { Subject, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    subjects: Subject[]
    totalCount: number
    selectedSubject: Subject | null
}

type Actions = {
    setData: (data: PagedResult<Subject>) => void
    setSelectedSubject: (subject: Subject) => void     
    appendData: (newSubjects: Subject[]) => void
}

const initialState: State = {
    subjects: [],
    totalCount: 0,
    selectedSubject: null
}

export const useSubjectStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Subject>) => {
        set(() => ({
            subjects: data.data,
            totalCount: data.count
        }))
    },

    setSelectedSubject: (subject: Subject) => {
        set(() => ({
            selectedSubject: subject
        }))
    },

    appendData: (newSubjects: Subject[]) => {
        set((state) => ({
            subjects: [...state.subjects,...newSubjects]
        }))
    }
}))