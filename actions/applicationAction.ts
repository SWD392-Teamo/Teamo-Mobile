import { fetchWrapper } from "@/lib/fetchWrapper";
import { Application, PagedResult } from "@/types";

export async function getSentApplications(studentId: number) : Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`applications?studentId=${studentId}`)
}