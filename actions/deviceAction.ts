import { fetchWrapper } from "@/lib/fetchWrapper";

export async function addDevice(token: string) : Promise<any> {
    return await fetchWrapper.post(`devices/token`, token)
}