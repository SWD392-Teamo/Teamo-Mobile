import { fetchWrapper } from "@/lib/fetchWrapper";
import { Profile } from "@/types";

export async function getProfile() : Promise<Profile> {
    console.log("somethin")
    return await fetchWrapper.get(`profile`);
}