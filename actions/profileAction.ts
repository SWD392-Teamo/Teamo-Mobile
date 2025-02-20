import { fetchWrapper } from "@/lib/fetchWrapper";
import { Profile } from "@/types";

export async function getProfile(userId: number) : Promise<Profile> {
    return await fetchWrapper.get(`users/${userId}/profile`);
}