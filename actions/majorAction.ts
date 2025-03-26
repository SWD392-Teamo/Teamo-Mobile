import { fetchWrapper } from "@/lib/fetchWrapper";
import { Major, PagedResult } from "@/types";

export async function getMajors(query:string) : Promise<PagedResult<Major>> {
    return await fetchWrapper.get(`majors${query}`)
}