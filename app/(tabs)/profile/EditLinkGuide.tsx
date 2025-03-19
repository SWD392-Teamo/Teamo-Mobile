import { icons } from "@/constants"
import { useLinkStore } from "@/hooks/useLinkStore"
import { Link } from "@/types"
import { router } from "expo-router"
import React from "react"
import { Text, TouchableOpacity, Image, View } from "react-native"

type Props = {
  link: Link 
}

export default function EditLinkGuide({ link }: Props) {
  const setSelectedLink = useLinkStore(state => state.setSelectedLink);
    
  const handlePress = () => {
    setSelectedLink(link);
    router.push('/profile/EditLinkForm');
  };

  return (
    <TouchableOpacity 
      className="w-full bg-white p-3 my-2 rounded-lg shadow shadow-black/10 elevation-2"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex flex-row items-center w-full">
        <View className="mr-3">
          <Image 
            className="w-5 h-5"
            source={icons.link}  
          />
        </View>
        <View>
          <Text className="text-black font-bregular text-bsm font-bold">{link.name}</Text>
          <Text  className="font-bregular text-gray-500 text-bxsm">{link.url}</Text>
        </View>
        <TouchableOpacity className="ml-auto">
          <Image 
            className="w-5 h-5"
            source={icons.edit}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}