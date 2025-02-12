import { User } from "@/types/auth"
import { create } from "zustand"

type State = {
    isAuthenticated: boolean,
    currentUser: User | null,
    token: string
}

type Actions = {
    setCurrentUser: (user: User) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
    setToken: (token: string) => void
    logout: () => void
}

const initialState: State = {
    isAuthenticated: false,
    currentUser: null,
    token: ''
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

    // Set token state
    setToken: (token: string) => {
        set(() => ({
            token: token
        }))
    },

    // Logout
    logout: () => set(initialState),
}))