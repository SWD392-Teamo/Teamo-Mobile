import { create } from "zustand"

type State = {
    search?: string
    sort?: string
    status?: string
}

type Actions = {
    setParams: (params: Partial<State>) => void
    reset: () => void
}

const initialState: State = {
    search: undefined,
    sort: undefined,
    status: undefined
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