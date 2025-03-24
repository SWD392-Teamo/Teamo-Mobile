import { PagedResult, Post } from "@/types"
import { create } from "zustand"

type State = {
   posts: Post[]
   totalCount: number
   pageSize: number
   selectedPost: Post | null
}

type Actions = {
   setData: (data: PagedResult<Post>) => void
   setSelectedPost: (post: Post) => void
   appendData: (newPosts: Post[]) => void
   resetData: () => void
}

const initialState: State = {
   posts: [],
   totalCount: 0,
   pageSize: 0,
   selectedPost: null
}

export const usePostStore = create<State & Actions>((set) => ({
   ...initialState,

   setData: (data: PagedResult<Post>) => {
      set(() => ({
         posts: data.data,
         totalCount: data.count,
         pageSize: data.pageSize
      }))
   },

   setSelectedPost: (post: Post) => set(() => ({ selectedPost: post })),

   appendData: (newPosts: Post[]) => {
        set((state) => ({
            posts: [...state.posts,...newPosts]
        }))
    },

   resetData: () => {
      set(() => ({
         posts: [],
         totalCount: 0,
         pageSize: 0,
      }))
   }
}))