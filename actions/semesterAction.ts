import { fetchWrapper } from "@/lib/fetchWrapper";
import { PagedResult, Semester } from "@/types";

export async function getSemesters(query: string) : Promise<PagedResult<Semester>> {
    return await fetchWrapper.get(`semesters${query}`);
}

export async function getCurrentSemester() : Promise<Semester> {
    return await fetchWrapper.get(`semesters/current`);
}