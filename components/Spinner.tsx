import React from 'react'
import { ActivityIndicator, ColorValue, Dimensions, Platform, View } from 'react-native';

type Props = {
    isLoading: boolean
    spinnerColor: ColorValue
}

export default function Spinner({isLoading, spinnerColor}: Props) {
  // Get device's dimension
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-tertiary/60 z-10"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color={spinnerColor}
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  )
}
