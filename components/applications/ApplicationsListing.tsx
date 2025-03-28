import { deleteApplication, getGroupApplications, getUserApplications, reviewApplication } from '@/actions/applicationAction';
import CustomButton from '@/components/CustomButton';
import { colors } from '@/constants/colors';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useGlobalContext } from '@/providers/AuthProvider';
import { useLoading } from '@/providers/LoadingProvider';
import loadMore from '@/utils/loadMore';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { useShallow } from 'zustand/shallow';
import ApplicationCard from './ApplicationCard';
import { useGroupStore } from '@/hooks/useGroupStore';
import { Application, GroupMemberToAdd } from '@/types';
import { addMemberToGroup, getGroupById } from '@/actions/groupAction';
import ProfileModalForView from '../profile/ProfileModalForView';

type Props = {
  isForUser: boolean
}

export default function ApplicationsListing({isForUser}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const {currentUser} = useGlobalContext()
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [sort, setSort] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);

  const setData = useApplicationStore((state) => state.setData);
  const appendData = useApplicationStore((state) => state.appendData)

  const setParams = useParamsStore(state => state.setParams)

  const { selectedGroup } = useGroupStore(
      useShallow((state) => ({
          selectedGroup: state.selectedGroup,
      }))
  );

  const data = useApplicationStore(
      useShallow((state) => state.applications)
  );

  const getUrlForUser = (pageNum:number) => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        studentId: currentUser?.id,
        ...(status.trim() ? { status: status } : {}),
        ...(sort.trim() ? { sort } : {}),
        pageIndex: pageNum
      },
    });
  };

  const getUrlForGroup = (pageNum:number) => {
    return queryString.stringifyUrl({
      url: "",
      query: {
        ...(status.trim() ? { status: status } : {}),
        ...(sort.trim() ? { sort } : {}),
        pageIndex: pageNum
      },
    });
  };

  async function initData() {
    setPage(1);
    setHasMore(true);
    showLoading();

    if(isForUser) {
      await getApplicationsForUser()
    }
    else {
      await getApplicationsForGroup()
    }
  }

  async function getApplicationsForUser() {
    await getUserApplications(getUrlForUser(1)).then((response) => {
      setData(response);
      setHasMore(response.data.length < response.count);
      hideLoading();
    });
  }

  async function getApplicationsForGroup() {
    await getGroupApplications(getUrlForGroup(1), selectedGroup?.id).then((response) => {
      setData(response);
      setHasMore(response.data.length < response.count);
      hideLoading();
    });
  }

  const handleOpenProfile = (studentId: number) => {
    setUserId(studentId);
    setProfileModalVisible(true);
  };

  const handleCloseProfile = () => {
    setProfileModalVisible(false);
    // Reset userId to null after closing the modal
    setUserId(null);
  };

  async function onApproveApplication(groupId: number, appId: number, application: Application) {
    try {
      showLoading();
      const res = await reviewApplication(groupId, appId, {status: 'Approved'});
      if(res.error == undefined) {
        ToastAndroid.show('Approved application successfully.', ToastAndroid.SHORT);
        var newMember: GroupMemberToAdd = {
          studentId: application.studentId,
          groupPositionIds: [application.groupPositionId]
        };
        const addRes = await addMemberToGroup(groupId, newMember);
        if(addRes.error == undefined) {
          ToastAndroid.show('Added member successfully.', ToastAndroid.SHORT);
          const updatedGroup = await getGroupById(groupId);
          setSelectedGroup(updatedGroup);
        } else if(addRes.statusCode) {
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
        }
      } else if(res.statusCode) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
      await initData();
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  async function onRejectApplication(groupId: number, appId: number) {
    try {
      showLoading();
      const res = await reviewApplication(groupId, appId, {status: 'Rejected'});
      if(res.error == undefined) {
        ToastAndroid.show('Rejected application successfully.', ToastAndroid.SHORT);
      } else if(res.statusCode) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
      await initData();  
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  async function onDeleteApplication(groupId: number, appId: number) {
    try {
      showLoading();
      const res = await deleteApplication(groupId, appId);
      if(res.statusCode == 200) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
      await initData();
    } catch (error: any) {
      ToastAndroid.show('Error occured: ' + error.message, ToastAndroid.SHORT);
    } finally {
      hideLoading();
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      await initData();
    }

    fetchInitialData();
  }, [sort, status, getUserApplications, getGroupApplications]);

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
    
    var result = null;

    if(isForUser) {
      result = await loadMore(
        page,
        data,
        getUrlForUser,
        getUserApplications,
        appendData
      );
    }
    else {
      result = await loadMore(
        page,
        data,
        getUrlForGroup,
        getGroupApplications,
        appendData,
        selectedGroup?.id
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
    <>
    <ScrollView
      onScroll={({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isCloseToBottom(nativeEvent)) {
          handleLoadMore();
        }
      }}
      scrollEventThrottle={400}
      className='mb-14'
    >
      <View className = 'w-full flex justify-content-center'>
        <View className='flex flex-row justify-center'>
          <View className='max-w-[130px]'> 
            <CustomButton
              title='Requested'
              handlePress={() => {
                setParams({status: 'Requested'})
                setStatus('Requested')
              }}
              variant={status == 'Requested' ? 'active' : 'inactive'}
              containerStyles='small'
            />
          </View>
          <View className='max-w-[130px]'>
            <CustomButton
              title='Approved'
              handlePress={() => {
                setParams({status: 'Approved'})
                setStatus('Approved')
              }}
              variant={status == 'Approved' ? 'active' : 'inactive'}
              containerStyles='small'
            />
          </View>
          <View className='max-w-[130px]'>
            <CustomButton
              title='Rejected'
              handlePress={() => {
                setParams({status: 'Rejected'})
                setStatus('Rejected')
              }}
              variant={status == 'Rejected' ? 'active' : 'inactive'}
              containerStyles='small'
            />
          </View>
        </View>
        <View className='m-3 mt-5'>
          {data?.map((application) => (
            <ApplicationCard 
              key={application.id}
              application={application}
              approveAction={() => onApproveApplication(application.groupId,application.id,application)}
              rejectAction={() => onRejectApplication(application.groupId,application.id)}
              deleteAction={() => onDeleteApplication(application.groupId,application.id)}
              viewProfileAction={() => handleOpenProfile(application.studentId)}
              isForUser={isForUser}
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
    {userId &&
      <ProfileModalForView
        isVisible={profileModalVisible}
        userId={userId}
        onClose={handleCloseProfile}
      />
    }
    </>
  )
}