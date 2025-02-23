import { create } from "zustand"

type State = {
    search?: string
    sort?: string
    status?: string
    studentId?: number
    majorId?: number
    subjectId?: number
    fieldId?: number
}

type Actions = {
    setParams: (params: Partial<State>) => void
    reset: () => void
}

const initialState: State = {

}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,

    // Set the state in the store with the new param value
    setParams: (newParams: Partial<State>) => {
        set((state) => {
            return {...state, ...newParams}
        })
    },

    // Reset state to initial state
    reset: () => set(initialState),
}))