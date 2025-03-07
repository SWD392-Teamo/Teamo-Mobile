import { fetchWrapper } from "@/lib/fetchWrapper";
import { Skill } from "@/types";

export async function getSkills(query: string) : Promise<Skill[]> {
    return await fetchWrapper.get(`skills${query}`);
}