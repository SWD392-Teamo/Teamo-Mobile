import { getPostsInGroup } from '@/actions/postAction';
import { colors } from '@/constants/colors';
import { usePostStore } from '@/hooks/usePostStore';
import { useLoading } from '@/providers/LoadingProvider';
import loadMore from '@/utils/loadMore';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import queryString from 'query-string';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import PostCard from './PostCard';

export default function PostsListing() {
    const { showLoading, hideLoading } = useLoading();
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const {id} = useLocalSearchParams();

    const data = usePostStore(
      useShallow((state) => state.posts)
    )
  
    const setData = usePostStore((state) => state.setData);
    const resetData = usePostStore((state) => state.resetData);
    const appendData = usePostStore((state) => state.appendData);
  
    const getUrl = (pageNum:number) => {
      return queryString.stringifyUrl({
        url: "",
        query: {
          pageIndex: pageNum
        },
      });
    };
    
    useFocusEffect(
      useCallback(() => {
        setPage(1);
        setHasMore(true);
        showLoading();
    
        getPostsInGroup(getUrl(1), Number(id)).then((response) => {
          setData(response);
          setHasMore(response.data.length < response.count);
          hideLoading();
        });
        
        return () => {
          resetData();
        };
      }, [getPostsInGroup])
    );
    
  
    const handleLoadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
          
        const result = await loadMore(
          page,
          data,
          getUrl,
          getPostsInGroup, 
          appendData,
          Number(id)
        );

        setHasMore(result.hasMore);
        setPage(result.newPage);
        setLoadingMore(false);
      };
    
      const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= 
          contentSize.height - paddingToBottom;
      };

    return (
      <ScrollView
        onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
        className='mb-28'
      >
        <View className="w-full flex justify-center">
          <View className="w-full flex flex-col p-3 gap-8">
            {data &&
              data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </View>
          {loadingMore && (
            <View className="py-4 flex items-center justify-center">
              <ActivityIndicator size="small" color={colors.light.tint} />
              <Text className="text-center mt-2 text-gray-500">Loading post...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
