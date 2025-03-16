import { fetchWrapper } from "@/lib/fetchWrapper";
import { PagedResult, Semster } from "@/types";

export async function getSemsters(query: string) : Promise<PagedResult<Semster>> {
    return await fetchWrapper.get(`semesters${query}`);
}

export async function getCurrentSemester() : Promise<Semster> {
    return await fetchWrapper.get(`semesters/current`);
}