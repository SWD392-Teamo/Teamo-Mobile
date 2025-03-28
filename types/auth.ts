export type User = {
    id: number
    email: string
    role: string
}

// Define the shape of the context
export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
}