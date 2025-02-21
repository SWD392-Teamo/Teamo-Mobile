import { getSentApplications } from '@/actions/applicationAction';
import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useGlobalContext } from '@/providers/AuthProvider';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useShallow } from 'zustand/shallow';
import dateTimeFormatter from '@/utils/dateTimeFormatter';

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
        console.log("Fetched Applications:", data);
        console.log("Fetched Data Type:", Array.isArray(data));
        console.log()
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
        <View className = 'w-full flex justify-content-start h-full'>  
          {data.map((app) => (
            <View key={app.id}>
              <Text>{app.groupName}</Text>
              <Text>{app.groupPositionName}</Text>
              <Text>{dateTimeFormatter(app.requestTime)}</Text>
              <Text>{app.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
