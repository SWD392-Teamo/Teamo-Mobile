import { getPostsInGroup, getTopPosts } from '@/actions/postAction';
import { colors } from '@/constants/colors';
import { usePostStore } from '@/hooks/usePostStore';
import { useLoading } from '@/providers/LoadingProvider';
import loadMore from '@/utils/loadMore';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import queryString from 'query-string';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import PostCard from './PostCard';
import GuideMajorCard from '@/app/(tabs)/home/GuideMajorCard';
import { useGroupStore } from '@/hooks/useGroupStore';
import BackButton from '../BackButton';
import CustomButton from '../CustomButton';
import { icons } from '@/constants';
import ProfileModalForView from '../profile/ProfileModalForView';

type Props = {
  isNews: boolean
}

export default function PostsListing({isNews}: Props) {
    const { showLoading, hideLoading } = useLoading();
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const {id} = useLocalSearchParams();

    const router = useRouter();

    const handleOpenProfile = (studentId: number) => {
      setUserId(studentId);
      setProfileModalVisible(true);
    };
  
    const handleCloseProfile = () => {
      setProfileModalVisible(false);
      // Reset userId to null after closing the modal
      setUserId(null);
    };
    
    const { selectedGroup } = useGroupStore(
        useShallow((state) => ({
            selectedGroup: state.selectedGroup,
        }))
    );

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
    
        if (isNews) {
          getTopPosts(getUrl(1)).then((response) => {
            setData(response);
            setHasMore(response.data.length < response.count);
            hideLoading();
          });
        }
        else {
          getPostsInGroup(getUrl(1), Number(id)).then((response) => {
            setData(response);
            setHasMore(response.data.length < response.count);
            hideLoading();
          });
        }

        return () => {
          resetData();
        };
      }, [getPostsInGroup, getTopPosts])
    );
    
  
    const handleLoadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
          
        let result;

        if (isNews) {
          result = await loadMore(
            page,
            data,
            getUrl,
            getTopPosts, 
            appendData
          );
        }
        else {
          result = await loadMore(
            page,
            data,
            getUrl,
            getPostsInGroup, 
            appendData,
            Number(id)
          );
        }

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
      <SafeAreaView>
        <ScrollView
          onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (isCloseToBottom(nativeEvent)) {
              handleLoadMore();
            }
          }}
          scrollEventThrottle={400}
        >
          {isNews && 
            <View className = 'w-full flex justify-content-start'>  
              <GuideMajorCard />
            </View>
          }

          {!isNews && 
            <View className="m-3">
              <View className="flex flex-row justify-content-start align-middle">
                  <BackButton url={`groups/details/${selectedGroup?.id}`} />
                  <Text className="ml-5 text-bsm font-blight">{selectedGroup?.name}</Text>
              </View >
              <CustomButton
                  title="Upload Post"
                  handlePress={() => router.push(`/groups/details/${selectedGroup?.id}/posts/create`)}
                  icon={icons.plus}
                  iconColor={colors.dark.icon}
                  variant="secondary"
                  containerStyles='w-full'
              />
            </View>
          }

          <View className="w-full flex justify-center">
            <Text className='font-bbold text-3xl mt-10 mb-2 text-primary ms-3'>Latest Posts</Text>
            <View className="w-full flex flex-col p-3 gap-8">
              {data &&
                data.map((post) => (
                  <PostCard key={post.id} post={post} onViewProfile={() => handleOpenProfile(post.studentId)} />
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
        {userId &&
          <ProfileModalForView
            isVisible={profileModalVisible}
            userId={userId}
            onClose={handleCloseProfile}
          />
        }
      </SafeAreaView>
    );
  }
