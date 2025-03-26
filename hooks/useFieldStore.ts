import { Field } from "@/types"
import { create } from "zustand"

type State = {
    fields: Field[]
    selectedField: Field | null
}

type Actions = {
    setFields: (fields: Field[]) => void
    setSelectedField: (selectedField: Field) => void     
}

const initialState: State = {
    fields: [],
    selectedField: null
}

export const useFieldStore = create<State & Actions>((set) => ({
    ...initialState,

    setFields: (fields: Field[]) => {
        set(() => ({
            fields: fields
        }))
    },

    setSelectedField: (field: Field) => {
        set(() => ({
            selectedField: field
        }))
    }

}))