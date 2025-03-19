import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, GroupMemberToAdd, PagedResult } from "@/types"

export async function getGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}

export async function getOwnedGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups/me${query}`)
}

export async function addMemberToGroup(groupId: number, newMember: GroupMemberToAdd) : Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/members`, newMember)
}
