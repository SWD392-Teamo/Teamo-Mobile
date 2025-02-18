import { icons } from '@/constants';
import { RelativePathString, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native';

type Props = {
    url: string
}

export default function BackButton({url}: Props) {

    const router = useRouter();

    // Go back to a specific page
    async function goBack() {
        router.push(url as `/?${string}`);
    }

  return (
    <TouchableOpacity onPress={() => goBack()}>
        <Image
            source={icons.backArrow}
            className="w-8 h-8 mb-5"
            resizeMode="contain"
        />
    </TouchableOpacity>
  )
}