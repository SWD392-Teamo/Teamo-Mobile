import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getFields(query: string) {
    return await fetchWrapper.get(`fields${query}`);
}