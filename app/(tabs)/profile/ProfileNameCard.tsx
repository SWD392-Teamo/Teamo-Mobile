import { Text, View } from 'react-native'

interface ProfileNameCardProps {
    name: string | undefined
    description: string | undefined
}

const ProfileNameCard = ({name, description} : ProfileNameCardProps) => {
    return(
        <View className='flex flex-row flex-1 flex-wrap m-2 ml-3 mb-3 mr-3'>
            <Text className="text-bl font-bbold text-black">{name}</Text>
            <Text className="text-bsm font-bregular text-gray-800">{description}</Text>
        </View>
    )
}

export default ProfileNameCard