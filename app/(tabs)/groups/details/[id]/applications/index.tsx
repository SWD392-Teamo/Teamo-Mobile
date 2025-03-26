import ApplicationsListing from '@/components/applications/ApplicationsListing';
import BackButton from '@/components/BackButton';
import { useGroupStore } from '@/hooks/useGroupStore';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

export default function GroupsApplication() {
    const { selectedGroup } = useGroupStore(
        useShallow((state) => ({
            selectedGroup: state.selectedGroup,
        }))
    );

    return (
      <SafeAreaView>
        <View className="m-2 ml-5">
          <View className="flex flex-row justify-content-start">
              <BackButton url={`groups/details/${selectedGroup?.id}`} />
              <Text className="ml-5 text-bsm font-blight">{selectedGroup?.name}</Text>
          </View >
        </View>
        <ApplicationsListing isForUser={false}/>
      </SafeAreaView>
    )
}
