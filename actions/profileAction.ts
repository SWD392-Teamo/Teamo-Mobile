import { fetchWrapper } from "@/lib/fetchWrapper";
import { Profile } from "@/types";

export async function getProfile(userId: number) : Promise<Profile> {
    return await fetchWrapper.get(`users/${userId}/profile`);
}

export async function updateProfileDescription({id, description, imgUrl }: Profile) : Promise<any> {
    return await fetchWrapper.patch(`users/${id}/profile/descriptions`, {description, imgUrl});
}

export async function addProfileSkill(userId: number, {skillId, level}: any) : Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/skills`, {skillId, level});
}

export async function deleteProfileSkill(userId: number, studentSkillId: number) : Promise<any> {
    return await fetchWrapper.del(`users/${userId}/profile/skills/${studentSkillId}`);
}

export async function updateProfileSkill(userId: number, {studentSkillId, level}: any) : Promise<any> {
    return await fetchWrapper.patch(`users/${userId}/profile/skills/${studentSkillId}`, {studentSkillId, level});
}

export async function addProfileLink(userId: number, {name, url}: any) : Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/links`, {name, url});
}

export async function removeProfileLink(userId: number, linkId: number) : Promise<any> {
    return await fetchWrapper.del(`users/${userId}/profile/links/${linkId}`)
}

export async function updateProfileLink(userId: number, {linkId, name, url}: any) : Promise<any> {
    return await fetchWrapper.patch(`users/${userId}/profile/links/${linkId}`, {name, url});
}