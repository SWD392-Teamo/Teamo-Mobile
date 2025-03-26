import PostsListing from '@/components/posts/PostsListing';
import React from 'react';

export default function Home() {
  return (
    <PostsListing isNews={true} />
  )
}
