import { Text, View } from 'react-native'

interface ProfileNameCardProps {
    name: string | undefined
    description: string | undefined
}

const ProfileNameCard = ({name, description} : ProfileNameCardProps) => {
    return(
        <View >
            <Text className="text-pxl font-bbold text-black">{name}</Text>
            <Text className="text-pm font-bregular text-gray-800">{description}</Text>
        </View>
    )
}

export default ProfileNameCard