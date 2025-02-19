import { useRouter } from "expo-router";
import { View } from "react-native";
import CustomButton from "./CustomButton";
import { useState } from "react";

export default function ProfileDetailsButton() {
    const router = useRouter()

    const [isActive, setIsActive] = useState(false)

    async function onProfileDetails() {
        setIsActive(true)
        router.push('/(tabs)/(profile)')
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