import { fetchWrapper } from "@/lib/fetchWrapper";
import { Application } from "@/types";

export async function getSentApplications(params:string) : Promise<Application> {
    return await fetchWrapper.get(`applications`)
}