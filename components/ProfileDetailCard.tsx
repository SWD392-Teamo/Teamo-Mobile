import { Text, View } from 'react-native'

interface ProfileDetailCardProps {
    name: string | undefined
    description: string | undefined
}

const ProfileDetailCard = ({name, description} : ProfileDetailCardProps) => {
    return(
        <View className = 'mb-1'>
            <Text className="text-pm font-psemibold text-black">{name}</Text>
            <Text className="text-psm font-pregular text-gray-800">{description}</Text>
        </View>
    )
}

export default ProfileDetailCard