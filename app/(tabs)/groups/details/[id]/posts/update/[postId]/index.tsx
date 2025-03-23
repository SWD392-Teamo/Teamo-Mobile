import { getPostById } from '@/actions/postAction'
import PostForm from '@/app/(tabs)/groups/details/[id]/posts/PostForm'
import { useGroupStore } from '@/hooks/useGroupStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Post } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'

export default function PostUpdate() {
  const [selectedPost, setSelectedPost] = useState<Post>();
  const {showLoading, hideLoading} = useLoading();
  const {groupId} = useLocalSearchParams();
  const {postId} = useLocalSearchParams();

  useEffect(() => {
    showLoading();
    getPostById(Number(groupId), Number(postId)).then((response) => {
      setSelectedPost(response);
      hideLoading();
    });
  }, [])

  return (
    <PostForm post={selectedPost} />
  )
}
