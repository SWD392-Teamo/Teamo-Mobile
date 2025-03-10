import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useShallow } from 'zustand/shallow';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';
import { useMajorStore } from '@/hooks/useMajorStore';
import { getMajors } from '@/actions/majorAction';
import MajorHeader from './MajorHeader';
import MajorCard from './MajorCard';
import loadMore from '@/utils/loadMore';

export default function MajorsListing() {
  const [isLoading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const status = "Active";  
  const [search, setSearch] = useState<string>("");

  const { setParams } = useParamsStore();
  const setData = useMajorStore((state) => state.setData);
  const appendData = useMajorStore((state) => state.appendData);
  
  const params = useParamsStore(
    useShallow((state) => ({
      search: state.search,
      status: status
    }))
  );

  useEffect(() => {
    setParams({ status: status })
  }, [setParams]);

  const data = useMajorStore(
    useShallow((state) => state.majors)
  );

  const getUrl = (pageNum:number) => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...params,
        ...(search.trim() ? { search } : {}),
        pageIndex: pageNum
      },
    });
  };

  useEffect(() => {
    // Reset pagination when search changes
    setPage(1);
    setHasMore(true);
    setLoading(true);
    
    getMajors(getUrl(1)).then((response) => {
      setData(response);
      setHasMore(response.data.length < response.count);
      setLoading(false);
    });
  }, [search, params]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    const result = await loadMore(
      page,
      data,
      getUrl,
      getMajors, 
      appendData
    );
    
    setHasMore(result.hasMore);
    setPage(result.newPage);
    setLoadingMore(false);
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const paddingToBottom = 40;
    return layoutMeasurement.height + contentOffset.y >= 
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView
        onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className='w-full flex justify-content-center'>  
          <MajorHeader 
            setSearch={setSearch}
          />
          <View>
            {data && data.map((major) => (
              <MajorCard 
                key={major.id}
                major={major}
              />
            ))}
          </View>
          {loadingMore && (
            <View className="py-4 flex items-center justify-center">
              <ActivityIndicator size="small" color={colors.light.tint} />
              <Text className="text-center mt-2 text-gray-500">Loading majors...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}