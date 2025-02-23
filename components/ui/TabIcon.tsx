import React from 'react'
import { ColorValue, Image, ImageSourcePropType, Text, View } from 'react-native'

type Props ={
  icon: ImageSourcePropType,
  resizeMode?: 'contain',
  color: ColorValue,
  focused: boolean,
  name: string,
}

export default function TabIcon(props: Props) {
  return (
    <View className="flex items-center justify-center gap-0.5 min-w-[100px]">
      <Image
        source={props.icon}
        resizeMode="contain"
        tintColor={props.color}
        className="w-6 h-6"
      />
      <Text
        className={`${props.focused ? "font-bsemibold" : "font-bregular"} text-xs`}
        style={{ color: props.color }}
      >
        {props.name}
      </Text>
    </View>
  )
}
