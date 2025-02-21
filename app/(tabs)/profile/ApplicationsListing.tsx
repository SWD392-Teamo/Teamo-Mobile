import { getSentApplications } from '@/actions/applicationAction';
import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useGlobalContext } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import dateTimeFormatter from '@/utils/dateTimeFormatter';
import ApplicationsCard from './ApplicationsCard';

export default function ApplicationsListing() {
  const [isLoading, setLoading] = useState(true);

  const {currentUser} = useGlobalContext()

  const data = useApplicationStore(
      useShallow((state) => state.applications)
  );

  const setData = useApplicationStore((state) => state.setData)

  useEffect(() => {
    if (currentUser) {
      getSentApplications(currentUser.id).then((data) => {
        setData(data)
        setLoading(false)
      })
    }
  }, [currentUser])

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />

      <ScrollView>
        <View className = 'w-full flex justify-content-center h-full'>  
          <ApplicationsCard applications={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
