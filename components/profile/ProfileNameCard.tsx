import { useGlobalContext } from '@/providers/AuthProvider'
import { Text, View } from 'react-native'
import CustomButton from '../CustomButton'
import { icons } from '@/constants'
import { colors } from '@/constants/colors'
import { router } from 'expo-router'

interface ProfileNameCardProps {
    id: number | undefined
    name: string | undefined
    description: string | undefined
}


const ProfileNameCard = ({id, name, description} : ProfileNameCardProps) => {
    const { currentUser } = useGlobalContext();

    async function onEditDescription() {
        router.push('/profile/EditProfileDescription');
    }
    
    return(
        <View className='flex-1 ml-5'>
            <View className='flex flex-row items-center justify-between'>
                <Text className="text-bl font-bbold text-black">{name}</Text>
                {currentUser?.id == id && (
                    <CustomButton
                        title=""
                        variant="default"
                        icon={icons.edit}
                        iconColor={colors.light.icon}
                        handlePress={onEditDescription}
                        containerStyles="h-8 w-8 justify-center items-center"
                    />
                )}
            </View>
            <Text className="text-bsm font-bregular text-gray-800">{description}</Text>
        </View>
    )
}

export default ProfileNameCard