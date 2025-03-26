import { fetchWrapper } from "@/lib/fetchWrapper";
import { Field } from "@/types";

export async function getFields(query: string): Promise<Field[]> {
    return await fetchWrapper.get(`fields${query}`);
}