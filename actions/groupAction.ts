import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, GroupMemberToAdd, GroupToCreate, PagedResult } from "@/types"
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

export async function createGroup(newGroup: GroupToCreate): Promise<any> {
    return await fetchWrapper.post(`groups`, newGroup);
}

export async function deleteGroup(groupId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}`)
}

export async function updateGroup(groupId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}`, data);
}

export async function uploadGroupImage(groupId: number, formData: FormData) : Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/images`, formData);
} 

export async function addMemberToGroup(groupId: number, newMember: GroupMemberToAdd) : Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/members`, newMember)
}

export async function removeMemberFromGroup(groupId: number, studentId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}/members/${studentId}`)
}

export async function updateMember(groupId: number, studentId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/members/${studentId}`, data)
}

export async function addGroupPosition(groupId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/positions`, data)
}

export async function updateGroupPosition(groupId: number, positionId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/positions/${positionId}`, data)
}

export async function deleteGroupPosition(groupId: number, positionId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}/positions/${positionId}`)
}
