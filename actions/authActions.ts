import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";

export async function login(data: FieldValues) {
    const response = await fetchWrapper.post(`account/login`, data);
    return response;
}

export async function googleLogin(idToken: string) {
    const response = await fetchWrapper.post(`account/google-login`, {idToken});
    return response;
}

export async function getCurrentUser() {
    return await fetchWrapper.get(`account/user-info`);
}

export async function logout() {
    return await fetchWrapper.post(`account/logout`, {});
}