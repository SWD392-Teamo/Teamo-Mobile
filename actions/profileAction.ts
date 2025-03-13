import { fetchWrapper } from "@/lib/fetchWrapper";
import { Profile } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getProfile(userId: number) : Promise<Profile> {
    return await fetchWrapper.get(`users/${userId}/profile`);
}

export async function updateProfileDescription(userId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`users/${userId}/profile/descriptions`, data);
}

export async function addProfileSkill(userId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/skills`, data);
}

export async function deleteProfileSkill(userId: number, studentSkillId: number) : Promise<any> {
    return await fetchWrapper.del(`users/${userId}/profile/skills/${studentSkillId}`);
}

export async function updateProfileSkill(userId: number, studentSkillId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`users/${userId}/profile/skills/${studentSkillId}`, data);
}

export async function addProfileLink(userId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/links`, data);
}

export async function removeProfileLink(userId: number, linkId: number) : Promise<any> {
    return await fetchWrapper.del(`users/${userId}/profile/links/${linkId}`)
}

export async function updateProfileLink(userId: number, linkId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`users/${userId}/profile/links/${linkId}`, data);
}