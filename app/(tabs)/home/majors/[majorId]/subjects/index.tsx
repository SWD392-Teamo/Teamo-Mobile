import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';
import { useMajorStore } from '@/hooks/useMajorStore';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { getSubjects } from '@/actions/subjectAction';
import SubjectHeader from './SubjectHeader';
import SubjectCard from './SubjectCard';
import loadMore from '@/utils/loadMore';
import { useLoading } from '@/providers/LoadingProvider';

export default function SubjectsListing() {
  const { showLoading, hideLoading } = useLoading();
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const status = "Active";  
  const [search, setSearch] = useState<string>("");

  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor
    }))
  );

  const { setParams } = useParamsStore();
  const setData = useSubjectStore((state) => state.setData);
  const appendData = useSubjectStore((state) => state.appendData);
  
  const params = useParamsStore(
    useShallow((state) => ({
      status: status,
      search: state.search
    }))
  );

  useEffect(() => {
    if(selectedMajor) {
      setParams({ 
        status: status  
      })
    }
  }, [setParams]);

  const data = useSubjectStore(
      useShallow((state) => state.subjects)
  );

  const getUrl = (pageNum:number) => {
      return queryString.stringifyUrl({
        url: "",
        query: {
          ...params,
          ...(search.trim() ? { search } : {}),
          ...(selectedMajor? {majorId: selectedMajor.id} : {}),
          pageIndex: pageNum
        },
      });
    };

  useEffect(() => {
    if(selectedMajor) {
      setPage(1);
      setHasMore(true);
      showLoading();

      getSubjects(getUrl(1)).then((response) => {
        setData(response);
        setHasMore(response.data.length < response.count)
        hideLoading();
      });
    }
  }, [search, selectedMajor, getSubjects]);

  if (!selectedMajor) {
    return (
      <SafeAreaView>
        <View className="flex-1 justify-center items-center">
          <Text className="font-bregular text-bm text-primary">
            No major selected
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
      
    setLoadingMore(true);
      
    const result = await loadMore(
      page,
      data,
      getUrl,
      getSubjects, 
      appendData
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
    <SafeAreaView>
      <ScrollView
        onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <View className = 'w-full flex justify-content-center'>  
          <SubjectHeader
            major={selectedMajor}
            setSearch={setSearch}
          />
          <View>
            {data.map((subject) => (
              <SubjectCard 
                key={subject.id}
                subject={subject}
              />
            ))}
          </View>
          {loadingMore && (
            <View className="py-4 flex items-center justify-center">
              <ActivityIndicator size="small" color={colors.light.tint} />
              <Text className="text-center mt-2 text-gray-500">Loading subjects...</Text>
            </View>
          )}  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}