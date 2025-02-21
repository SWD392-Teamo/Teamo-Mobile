import CustomButton from '@/components/CustomButton'
import Spinner from '@/components/Spinner';
import { images } from '@/constants';
import { colors } from '@/constants/colors';
import { useGlobalContext } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function OnBoarding() {
  const router = useRouter();

  const { loading, isAuthenticated } = useGlobalContext();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/home');
    }
  }, [loading, isAuthenticated, router]);

  // Shared values for animation
  const sloganOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);

  // Animated styles
  const sloganStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sloganOpacity.value, {
        duration: 1500,
        easing: Easing.ease,
      }),
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(buttonTranslateY.value, {
            duration: 2000,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  // Trigger animation on mount
  useEffect(() => {
    sloganOpacity.value = 1;
    buttonTranslateY.value = 0;
  }, []);

  return (
    <SafeAreaView className="bg-tertiary h-full p-4">

      <Spinner 
        isLoading={loading}
        spinnerColor={colors.light.tint} />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full">

          <Text className="text-primary font-righteous text-5xl">Teamo</Text>

          <Image
            source={images.onboarding}
            className="max-w-[1100px] w-full h-[500px]"
            resizeMode="contain"
          />

          <Animated.View style={[sloganStyle]}>
            <Text className="text-3xl text-grey font-bbold text-center">
              Explore Boundless{"\n"}
              Collaboration with{" "}
              <Text className="text-primary font-righteous">Teamo</Text>
            </Text>
            <Text className="text-sm font-bregular text-grey mt-7 text-center">
              Find Your Perfect Teammates, Build Stronger Projects!
            </Text>
          </Animated.View>

          <Animated.View style={[buttonStyle]}>
            <CustomButton
              title="Get Started"
              handlePress={() => router.push('/login')}
              variant="primary"
              containerStyles="w-full mt-7"
            />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
