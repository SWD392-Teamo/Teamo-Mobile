import { Application, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    applications: Application[]
    totalCount: number
    pageCount: number
    selectedApplication: Application | null
}

type Actions = {
    setData: (data: PagedResult<Application>) => void
    setSelectedApplication: (application: Application) => void
}

const initialState: State = {
    applications: [],
    pageCount: 0,
    totalCount: 0,
    selectedApplication: null
}

export const useApplicationStore = create<State & Actions>((set) => ({
    ...initialState,
    setData: (data: PagedResult<Application>) => {
        set(() => ({
            applications: data.data,
            pageCount: data.pageSize,
            totalCount: data.count
        }))
    },

    setSelectedApplication: (application: Application) => {
        set(() => ({
            selectedApplication: application
        }))
    }
}))