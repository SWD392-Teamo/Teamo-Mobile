import { fetchWrapper } from "@/lib/fetchWrapper";
import { Application, PagedResult } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getUserApplications(query: string): Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`applications${query}`)
}

export async function getGroupApplications(groupId: number, query: string): Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`groups/${groupId}/applications${query}`)
}

export async function getGroupApplicationById(groupId: number, appId: number): Promise<Application> {
    return await fetchWrapper.get(`groups/${groupId}/applications/${appId}`)
}

export async function getUserApplicationById(appId: number): Promise<Application> {
    return await fetchWrapper.get(`applications/${appId}`)
}

export async function reviewApplication(groupId: number, applicationId: number, status: {status: string}): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/applications/${applicationId}`, status)
}

export async function sendApplication(groupId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/applications`, data)
}

export async function uploadApplicationDocument(formData: FormData): Promise<any> {
    return await fetchWrapper.post(`applications/document`, formData)
}

export async function deleteApplication(groupId:number, appId:number) {
    return await fetchWrapper.del(`groups/${groupId}/applications/${appId}`)
}