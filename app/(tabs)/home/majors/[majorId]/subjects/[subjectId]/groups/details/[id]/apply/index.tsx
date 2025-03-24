import ApplicationForm from '@/components/applications/ApplicationForm';
import BackButton from '@/components/BackButton';
import { useGroupStore } from '@/hooks/useGroupStore';
import { useMajorStore } from '@/hooks/useMajorStore';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();

  // Get selected major, subject and group to route back to
  const {selectedMajor} = useMajorStore();
  const {selectedSubject} = useSubjectStore();
  const {selectedGroup, selectedGroupPosition} = useGroupStore();

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Header */}
        <View className='ml-5'>
            <View className="flex flex-row justify-content-start">
                <BackButton url={`home/majors/${selectedMajor?.id}/subjects/${selectedSubject?.id}/groups/details/${selectedGroup?.id}`} />
                <Text className="ml-5 text-bsm font-blight">{selectedGroup?.name}</Text>
            </View >
        </View>
        <ApplicationForm 
          majorId={selectedMajor?.id!}
          subjectId={selectedSubject?.id!}
          groupId={selectedGroup?.id!}
          groupPositionId={selectedGroupPosition?.id!} 
        />
      </ScrollView>
    </SafeAreaView>
  )
}
