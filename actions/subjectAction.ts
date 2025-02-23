import { fetchWrapper } from "@/lib/fetchWrapper";
import { PagedResult, Subject } from "@/types";

export async function getSubjects(query:string) : Promise<PagedResult<Subject>>{
    return await fetchWrapper.get(`subjects${query}`)
}