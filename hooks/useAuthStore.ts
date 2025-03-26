import { User } from "@/types/auth"
import { create } from "zustand"

type State = {
    isAuthenticated: boolean,
    currentUser: User | null,
}

type Actions = {
    setCurrentUser: (user: User) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
    reset: () => void
}

const initialState: State = {
    isAuthenticated: false,
    currentUser: null,
}

export const useAuthStore = create<State & Actions>()((set) => ({
    ...initialState,

    // Set current user state
    setCurrentUser: (user: User) => {
        set(() => ({
            currentUser: user
        }))
    },

    // Set authenticated state
    setIsAuthenticated: (isAuthenticated: boolean) => {
        set(() => ({
            isAuthenticated: isAuthenticated
        }))
    },

    // Logout
    reset: () => set(initialState),
}))