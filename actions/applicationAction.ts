import { fetchWrapper } from "@/lib/fetchWrapper";
import { Application, PagedResult } from "@/types";

export async function getSentApplications(query: string) : Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`applications${query}`)
}

export async function deleteApplication(groupId:number, appId:number) {
    return await fetchWrapper.del(`groups/${groupId}/applications/${appId}`)
}