import { Text, View } from 'react-native'

interface ProfileDetailCardProps {
    name: string | undefined
    description: string | undefined
}

const ProfileInformation = ({name, description} : ProfileDetailCardProps) => {
    return(
        <View className = 'mb-1'>
            <Text className="text-pm font-bsemibold text-black">{name}</Text>
            <Text className="text-psm font-bregular text-gray-800">{description}</Text>
        </View>
    )
}

export default ProfileInformation