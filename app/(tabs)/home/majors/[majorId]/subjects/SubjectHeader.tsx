import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import { Major } from "@/types";
import React from "react";
import { Text, View } from "react-native";

interface Props{
    major: Major
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SubjectHeader({major, setSearch}:Props) {
    return (
        <View className="m-2 ml-5">
            <View className="flex flex-row justify-content-start">
                <BackButton
                    url="home/majors"
                />
                <Text className="ml-5 text-bsm font-blight">{major?.name}</Text>
            </View >
            <View className="flex flex-row justify-content-center">
                <Text className="m-2 mr-5 text-bl text-secondary font-bsemibold">Subjects</Text>
                <SearchBar 
                    setSearch = {setSearch}
                />
            </View>
        </View>
    )
}