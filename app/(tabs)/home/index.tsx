import Spinner from '@/components/Spinner';
import { colors } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import GuideMajorCard from './GuideMajorCard'

export default function Home() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SafeAreaView>
      <Spinner 
        isLoading={isLoading}
        spinnerColor={colors.light.tint} 
      />
      <ScrollView>
        <View className = 'w-full flex justify-content-start'>  
          <GuideMajorCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
