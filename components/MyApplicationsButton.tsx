import { useFocusEffect, useRouter } from "expo-router";
import { View } from "react-native";
import CustomButton from "./CustomButton";
import { useCallback, useState } from "react";

export default function MyApplicationsButton() {
    const router = useRouter()

    const [isActive, setIsActive] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setIsActive(false);
            return () => {};
        }, [])
    );

    async function onMyApplications() {
        setIsActive(true)
        router.push('/profile/applications')
    }

    return(
        <View className='flex flex-row justify-center content-center'>
            <CustomButton
                title='Applications'
                handlePress={onMyApplications}
                variant={isActive? 'active' : 'inactive'}
                containerStyles='small'
            />
        </View>
    )
}