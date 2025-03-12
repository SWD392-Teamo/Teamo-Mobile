import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import GuideMajorCard from './GuideMajorCard';

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className = 'w-full flex justify-content-start'>  
          <GuideMajorCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
