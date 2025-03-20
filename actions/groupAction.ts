import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, GroupMemberToAdd, PagedResult } from "@/types"
import { FieldValues } from "react-hook-form"

export async function getGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}

export async function getGroupById(groupId: number): Promise<Group> {
    return await fetchWrapper.get(`groups/${groupId}`)
}

export async function getOwnedGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`profile/groups${query}`)
}

export async function deleteGroup(groupId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}`)
}

export async function updateGroup(groupId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}`, data);
}

export async function addMemberToGroup(groupId: number, newMember: GroupMemberToAdd) : Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/members`, newMember)
}
