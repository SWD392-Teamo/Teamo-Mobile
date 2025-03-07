import { fetchWrapper } from "@/lib/fetchWrapper";

export async function uploadImage(userId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/image`, formData)
}