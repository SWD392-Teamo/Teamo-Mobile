import { logout } from "@/actions/authActions";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useRouter } from "expo-router";
import { View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { colors } from "@/constants/colors";

export default function LogoutButton() {
    const reset = useAuthStore(state => state.reset)

    const router = useRouter()

    async function onLogout() {
        await logout()
        reset()
        router.push('/login')
    }

    return(
        <View className='flex flex-row justify-center content-center'>
            <CustomButton
                title='Logout'
                handlePress={onLogout}
                variant='secondary'
                containerStyles='small'
                icon={icons.logout}
                iconColor={colors.dark.icon}
            />
        </View>
    )
}