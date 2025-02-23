import { Application, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    applications: Application[]
    totalCount: number
    selectedApplication: Application | null
}

type Actions = {
    setData: (data: PagedResult<Application>) => void
    setSelectedApplication: (application: Application) => void
}

const initialState: State = {
    applications: [],
    totalCount: 0,
    selectedApplication: null
}

export const useApplicationStore = create<State & Actions>((set) => ({
    ...initialState,
    setData: (data: PagedResult<Application>) => {
        set(() => ({
            applications: data.data,
            totalCount: data.count
        }))
    },

    setSelectedApplication: (application: Application) => {
        set(() => ({
            selectedApplication: application
        }))
    }
}))