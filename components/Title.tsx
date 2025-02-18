import React from 'react'
import { Text, View } from 'react-native'

type Props = {
    title: string
    subtitle?: string
}

export default function Title({title, subtitle}: Props) {
  return (
    <View className='text-start'>
        <Text className='text-3xl font-bold text-secondary'>
            {title}
        </Text>
        <Text className='font-light text-grey mt-2'>
            {subtitle}
        </Text>
    </View>
  )
}