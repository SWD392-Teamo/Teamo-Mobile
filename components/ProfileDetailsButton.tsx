import { useFocusEffect, useRouter } from "expo-router";
import { View } from "react-native";
import CustomButton from "./CustomButton";
import { useCallback, useState } from "react";

export default function ProfileDetailsButton() {
    const router = useRouter()

    const [isActive, setIsActive] = useState(true)

    async function onProfileDetails() {
        setIsActive(true)
        router.push('/profile')
    }

    return(
        <View className='flex flex-row justify-center content-center'>
            <CustomButton
                title='Details'
                handlePress={onProfileDetails}
                variant={isActive? 'active' : 'inactive'}
                containerStyles='small'
            />
        </View>
    )
}