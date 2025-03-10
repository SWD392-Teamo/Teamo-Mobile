import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"

export async function getData(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}