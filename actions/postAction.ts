import { fetchWrapper } from "@/lib/fetchWrapper"
import { PagedResult, Post } from "@/types"

export async function getPostsInGroup(query: string, groupId?: number): Promise<PagedResult<Post>> {
    return await fetchWrapper.get(`groups/${groupId}/posts${query}`)
}

export async function getPostsInNewsFeed(query: string): Promise<PagedResult<Post>> {
    return await fetchWrapper.get(`posts${query}`)
}

export async function getPostById(groupId: number, postId: number): Promise<Post> {
    return await fetchWrapper.get(`groups/${groupId}/posts/${postId}`)
}

export async function createPost(groupId: number, data: FormData): Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/posts`, data)
}

export async function updatePost(groupId: number, postId: number, data: FormData): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/posts/${postId}`, data)
}

export async function deletePost(groupId:number, postId:number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}/posts/${postId}`)
}