import { deleteApplication, getUserApplications } from '@/actions/applicationAction';
import CustomButton from '@/components/CustomButton';
import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useGlobalContext } from '@/providers/AuthProvider';
import loadMore from '@/utils/loadMore';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import ApplicationCard from './ApplicationCard';
import { useLoading } from '@/providers/LoadingProvider';

export default function ApplicationsListing() {
  const { showLoading, hideLoading } = useLoading();
  const {currentUser} = useGlobalContext()
  const [status, setStatus] = useState<string>("");
  const [sort, setSort] = useState<string>("")
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { setParams } = useParamsStore();
  const setData = useApplicationStore((state) => state.setData);
  const appendData = useApplicationStore((state) => state.appendData)
  
  const params = useParamsStore(
    useShallow((state) => ({
      sort: state.sort,
      status: state.status
    }))
  );

  const data = useApplicationStore(
      useShallow((state) => state.applications)
  );

  const getUrl = (pageNum:number) => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        studentId: currentUser?.id,
        ...(status.trim() ? { status } : {}),
        ...(sort.trim() ? { sort } : {}),
        pageIndex: pageNum
      },
    });
  };

  async function initData() {
    setPage(1);
    setHasMore(true);
    showLoading();

    await getUserApplications(getUrl(1)).then((response) => {
      setData(response);
      setHasMore(response.data.length < response.count);
      hideLoading();
    });
  }

  async function onDeleteApplication(groupId: number, appId: number) {
    await deleteApplication(groupId, appId);
    await initData();
  }


  useEffect(() => {
    const fetchInitialData = async () => {
      await initData();
    }

    fetchInitialData();
  }, [sort, status, getUserApplications]);

  if (!currentUser) {
    return (
      <SafeAreaView>
        <View className="flex-1 justify-center items-center">
          <Text className="font-bregular text-bm text-primary">
            Please login to access information.
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
      getUserApplications,
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
          <View className='flex flex-row justify-start m-2'>
            <View className='max-w-[150px]'> 
              <CustomButton
                title='All'
                handlePress={() => setStatus('')}
                variant={status == '' ? 'active' : 'inactive'}
                containerStyles='small'
              />
            </View>
            <View className='max-w-[150px]'>
              <CustomButton
                title='Approved'
                handlePress={() => setStatus('Approved')}
                variant={status == 'Approved' ? 'active' : 'inactive'}
                containerStyles='small'
              />
            </View>
            <View className='max-w-[150px]'>
              <CustomButton
                title='Rejected'
                handlePress={() => setStatus('Rejected')}
                variant={status == 'Rejected' ? 'active' : 'inactive'}
                containerStyles='small'
              />
            </View>
          </View>
          <View className='m-3 mt-5'>
            {data.map((application) => (
              <ApplicationCard 
                key={application.id}
                application={application}
                action={() => onDeleteApplication(application.groupId,application.id)}
              />
            ))}
          </View>  
          {loadingMore && (
            <View className="py-4 flex items-center justify-center">
              <ActivityIndicator size="small" color={colors.light.tint} />
              <Text className="text-center mt-2 text-gray-500">Loading applications...</Text>
              </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}