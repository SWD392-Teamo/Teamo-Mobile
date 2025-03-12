import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"

export async function getGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}

export async function getOwnedGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups/me${query}`)
}
