import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import React from "react";
import { Text, View } from "react-native";

interface Props{
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function MajorHeader({setSearch}:Props) {
    return (
        <View className="m-2 ml-5">
            <View className="flex flex-row justify-content-start">
                <BackButton
                    url="home"
                />
                <Text className="ml-5 text-bsm font-blight">Home</Text>
            </View >
            <View className="mt-3 mb-3 flex flex-row justify-content-center">
                <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Majors</Text>
                <SearchBar 
                    setSearch = {setSearch}
                />
            </View>
        </View>
    )
}