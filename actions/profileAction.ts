import { fetchWrapper } from "@/lib/fetchWrapper";
import { Link, Profile, StudentSkillToAdd } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getProfile() : Promise<Profile> {
    return await fetchWrapper.get(`profile`);
}

export async function updateProfileDescription(data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`profile/description`, data);
}

export async function addProfileSkills(newSkills: StudentSkillToAdd[]) : Promise<any> {
    return await fetchWrapper.post(`profile/skills`, newSkills);
}

export async function deleteProfileSkill(studentSkillId: number) : Promise<any> {
    return await fetchWrapper.del(`profile/skills/${studentSkillId}`);
}

export async function updateProfileSkill(studentSkillId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`profile/skills/${studentSkillId}`, data);
}

export async function addProfileLinks(newLinks: { name: string, url: string }[]) : Promise<any> {
    return await fetchWrapper.post(`profile/links`, newLinks);
}

export async function removeProfileLink(linkId: number) : Promise<any> {
    return await fetchWrapper.del(`profile/links/${linkId}`)
}

export async function updateProfileLink(linkId: number, data: FieldValues) : Promise<any> {
    return await fetchWrapper.patch(`profile/links/${linkId}`, data);
}

export async function uploadImage(formData: FormData) : Promise<any> {
    return await fetchWrapper.post(`profile/image`, formData);
}