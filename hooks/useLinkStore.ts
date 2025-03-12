import { Link } from "@/types"
import { create } from "zustand"

type State = {
    links: Link[]
    selectedLink: Link | null
    setSelectedLink: (link: Link) => void
    setLinks: (links: Link[]) => void
}

export const useLinkStore = create<State>((set) => ({
    links: [],
    selectedLink: null,
    setSelectedLink: (link) => set({selectedLink: link}),
    setLinks: (links) => set({ links: links }),
}));