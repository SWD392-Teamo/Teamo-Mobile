import { getSentApplications } from '@/actions/applicationAction';
import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useGlobalContext } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import ApplicationsCard from './ApplicationsCard';
import { useParamsStore } from '@/hooks/useParamsStore';
import queryString from 'query-string';

export default function ApplicationsListing() {
  const [isLoading, setLoading] = useState(true);
  const {currentUser} = useGlobalContext()
  const [status, setStatus] = useState<string>("");
  const [sort, setSort] = useState<string>("")

  const { setParams } = useParamsStore();
  const setData = useApplicationStore((state) => state.setData);
  
  const params = useParamsStore(
    useShallow((state) => ({
      studentId: currentUser?.id,
      sort: state.sort,
      status: state.status
    }))
  );

  useEffect(() => {
    if (currentUser) {
      setParams({ studentId: currentUser.id })
    }
  }, [currentUser, setParams]);

  const data = useApplicationStore(
      useShallow((state) => state.applications)
  );

  useEffect(() => {
  if (currentUser) {
    const url = queryString.stringifyUrl({
      url: '',
      query: {
        studentId: currentUser.id,
        ...(sort.trim() ? { sort } : {}),
        ...(status.trim() ? { status } : {}),
      },
    });

    getSentApplications(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }
}, [currentUser, sort, status, getSentApplications]);

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView>
        <View className = 'w-full flex justify-content-center'>  
          <ApplicationsCard applications={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
